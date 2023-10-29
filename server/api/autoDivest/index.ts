import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoInvest';
  const topic = 'accountTransactions';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topicSub).read(service, body.record.message_id);

  if(message.status!=='complete') {
    return 'wrong payment status'
  }
  if (message.autoInvest === 0 || message.autoInvest === null || message.autoInvest === undefined) {
    return 'autoInvest is 0 or undefined';
  }
  if (message.subtype === 'autoInvested') {
    return 'already autoDivested';
  }
  if (message.type !== 'withdrawal') {
    return 'not a withdrawal';
  }

  const createExchangeOrder = async (userId: string, quantity: number, tickerx: tickers) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/index.ts'
    }).exchangeOrders({
      ticker: tickerx,
      type: 'buy',
      status: 'open',
      userId: userId,
      quantity: quantity
    });
    if(error) {
      return
    } else {
      return {
        ticker: tickerx,
        type: 'buy',
        status: 'open',
        userId: userId,
        quantity: quantity
      }
    }
  };
  const createWithdrawTransaction = async (userId: string, amount: number, currency: string) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/index.ts'
    }).accountTransactions({
      'userId': userId,
      'amount': -amount,
      'currency': currency,
      'autoInvest': 0,
      'type': 'withdraw',
      'status': 'complete',
      'subType': 'autoInvested',
    });
    if(error) {
      return
    } else {
      return {
        'userId': userId,
        'amount': -amount,
        'currency': currency,
        'autoInvest': 0,
        'type': 'withdraw',
        'status': 'complete',
        'subType': 'autoInvested',
      }
    }
  };

  const updateTransaction = async (userId: string, entity: string) => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/index.ts',
      entity: entity,
    }).accountTransactions({
      'userId': userId,
      'status': 'complete',
      'autoInvest': 0,
      'subType': 'autoInvested',
    });
    if(error) {
      return
    } else {
      return {
        'userId': userId,
        'status': 'complete',
        'autoInvest': 0,
        'subType': 'autoInvested',
      }
    }
  };

  let response = {
    'exchangeOrders': [],
    'withdrawTransaction': {},
    'updatedTransaction': {}
  }
  const assetPrices = await get(supabase).sharePrices() as any;
  const convertedCurrency = await get(supabase).exchangeRates('EUR', message.currency)
  const user = await get(supabase).user(message.userId);
  if(!user) return 'user not found'
  const autoInvestRate = user.autoInvest;
  const withdrawAmount = message.amount - (message.amount*(1 - autoInvestRate));
  
  const withdrawTransaction = await createWithdrawTransaction(user.userId, withdrawAmount, message.currency);
  response.withdrawTransaction = withdrawTransaction || {};
  const updatedTransaction = await updateTransaction(user.userId, message.message_entity);
  response.updatedTransaction = updatedTransaction || {};

  const userDefinedFund =  await get(supabase).userDefinedFund(user.userId)

  let total = 0;
  let userDefinedFundPercentage = {} as any;
  if(userDefinedFund){
    for (let i = 0; i < userDefinedFund.length; i++) {
      total += userDefinedFund[i].rate
    }
    for (let i = 0; i < userDefinedFund.length; i++) {
      const ticker = userDefinedFund[i].ticker;
      userDefinedFundPercentage[ticker]= userDefinedFund[i].rate / total;
    }
    for (let i = 0; i < userDefinedFund.length; i++) {
      const definedFundEntity = userDefinedFund[i];
      const currencyConvertedSharePrice = assetPrices[definedFundEntity.ticker ] * convertedCurrency;
      const investQuantity =  (message.amount * autoInvestRate) / currencyConvertedSharePrice;
      const exchangeOrder = await createExchangeOrder(user.userId, investQuantity, definedFundEntity.ticker);
      response.exchangeOrders.push(exchangeOrder);
    }
  } else {
    return {
      'error': 'could not find userDefinedFund'
    }
  }
  return response
});
