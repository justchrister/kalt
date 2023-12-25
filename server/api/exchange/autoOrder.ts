import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

/*
      We only support automatic investments since 
      divesting is done manually by admins. 

      This functionality will be added once we grow
      to a point where following up on divesting is
      too much work.

      Until then, it should be painful when someone
      chooses to stop vesting with us. 
*/

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoVest';
  const topic = 'accountTransactions';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topicSub).read(service, body.record.message_id);

  if(message.status!=='complete') {
    return 'wrong payment status'
  }
  if (message.autoVest === 0 || message.autoVest === null || message.autoVest === undefined) {
    return 'autoVest is 0 or undefined';
  }
  if (message.subtype === 'autoInvested') {
    return 'already autoInvested';
  }
  if (message.type !== 'deposit') {
    return 'not a deposit';
  }

  const createExchangeOrder = async (userId: string, quantity: number, tickerx: tickers) => {
    const error = await pub(supabase, {
      sender:'server/api/autoVest/index.ts'
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
    const error = await pub(supabase, {
      sender:'server/api/autoVest/index.ts'
    }).accountTransactions({
      'userId': userId,
      'amount': -amount,
      'currency': currency,
      'autoVest': 0,
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
        'autoVest': 0,
        'type': 'withdraw',
        'status': 'complete',
        'subType': 'autoInvested',
      }
    }
  };

  const updateTransaction = async (userId: string, entity: string) => {
    const error = await pub(supabase, {
      sender:'server/api/autoVest/index.ts',
      entity: entity,
    }).accountTransactions({
      'userId': userId,
      'status': 'complete',
      'autoVest': 0,
      'subType': 'autoInvested',
    });
    if(error) {
      return
    } else {
      return {
        'userId': userId,
        'status': 'complete',
        'autoVest': 0,
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
  const autoVestRate = user.autoVest;
  const withdrawAmount = message.amount - (message.amount*(1 - autoVestRate));
  
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
      const investQuantity =  (message.amount * autoVestRate) / currencyConvertedSharePrice;
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
