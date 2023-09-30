import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoInvest';
  const topicSub = 'accountTransactions';
  const topicPub = 'exchangeOrders';
  const body = await readBody(event);


  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topicSub).entity(body.record.message_entity);
  await sub(supabase, topicSub).read(service, body.record.message_id);

  if(message.status!=='complete') {
    return 'wrong payment status'
  }
  if (message.autoInvest === 0 || message.autoInvest === null || message.autoInvest === undefined) {
    return 'autoInvest is 0 or undefined';
  }
  if (message.subtype === 'autoInvested') {
    return 'already autoInvested';
  }
  if (message.type !== 'deposit') {
    return 'not a deposit';
  }

  const createExchangeOrder = async (userId, quantity, tickerx) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/webhooks/accountTransactions.ts'
    }).exchangeOrders({
      ticker: tickerx,
      type: 'buy',
      status: 'open',
      userId: userId,
      quantity: quantity
    });
    return
  };
  const createWithdrawTransaction = async (userId, amount, currency) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/accountTransactions.ts'
    }).accountTransactions({
      'userId': userId,
      'amount': -amount,
      'currency': currency,
      'autoInvest': 0,
      'type': 'withdraw',
      'status': 'complete',
      'subType': 'autoInvested',
    });
    return
  };

  const updateTransaction = async (userId, entity) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/accountTransactions.ts',
      entity: entity,
    }).accountTransactions({
      'userId': userId,
      'status': 'complete',
      'autoInvest': 0,
      'subType': 'autoInvested',
    });
    return
  };

  const assetPrices = await get(supabase).sharePrices();
  const convertedCurrency = await get(supabase).exchangeRates('EUR', message.currency)
  const user = await get(supabase).user(message.userId);
  const autoInvestRate = user.autoInvest;
  const withdrawAmount = message.amount - (message.amount*(1 - autoInvestRate));
  /*
  const withdrawTransaction = await createWithdrawTransaction(user.userId, withdrawAmount, message.currency);
  const updatedTransaction = await updateTransaction(user.userId, message.message_entity);
*/
  const userDefinedFund =  await get(supabase).userDefinedFund(user.userId)

  let total = 0;

  for (let i = 0; i < userDefinedFund.length; i++) {
    total += userDefinedFund[i].rate
  }
  let userDefinedFundPercentage = {};
  for (let i = 0; i < userDefinedFund.length; i++) {
    const ticker = userDefinedFund[i].ticker;
    userDefinedFundPercentage[ticker] = userDefinedFund[i].rate / total;
  }
  
  for (let i = 0; i < userDefinedFund.length; i++) {
    const cx = userDefinedFund[i];
    const currencyConvertedSharePrice = assetPrices[cx.ticker] * convertedCurrency;
    const investQuantity =  (message.amount * autoInvestRate) / currencyConvertedSharePrice;
    ok.log('', {
      currencyConvertedSharePrice,
      cx,
      investQuantity
    })
  }
  return 'done'
});
