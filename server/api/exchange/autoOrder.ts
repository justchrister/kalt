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

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoOrder';
  const topic = 'transactions';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);

  if(message.status!=='complete') {
    return 'wrong payment status'
  }
  if (message.type !== 'deposit') {
    return 'not a deposit';
  }
  if (message.autoVest === 0 || message.autoVest === null || message.autoVest === undefined) {
    return 'autoVest is 0 or undefined';
  }
  if (message.status === 'vested') {
    return 'already autoInvested';
  }

  const createExchangeOrder = async (userId: string, quantity: number, tickerx: tickers) => {
    const json ={
      ticker: tickerx,
      type: 'buy',
      status: 'open',
      userId: userId,
      quantity: quantity
    } as exchangeOrder;
    const error = await pub(supabase, {
      sender:'server/api/exchange/autoOrder.ts'
    }).exchangeOrders(json);
    if(error) {
      ok.log('error', error)
      return error
    } else {
      return {json}
    }
  };
  const createWithdrawTransaction = async (userId: string, amount: number, currency: string) => {
    const json = {
      'userId': userId,
      'amount': -amount,
      'currency': currency,
      'autoVest': 0,
      'type': 'withdraw',
      'subType': 'internal',
      'status': 'complete'
    } as transaction;
    const error = await pub(supabase, {
      sender:'server/api/exchange/autoOrder.ts'
    }).transactions(json);
    if(error) {
      return
    } else {
      return json
    }
  };

  const updateTransaction = async (userId: string, entity: string) => {
    const json = {
      'userId': userId,
      'status': 'vested',
      'autoVest': 0
    } as transaction;
    const error = await pub(supabase, {
      sender:'server/api/exchange/autoOrder.ts',
      entity: entity,
    }).transactions(json);
    if(error) {
      return
    } else {
      return json
    }
  };

  let response = {
    'exchangeOrders': [],
    'withdrawTransaction': {},
    'updatedTransaction': {}
  }
  const assetPrices = await get(supabase).sharePrices() as any;
  ok.log('', 'assetPrices: ', assetPrices)
  const convertedCurrency = await get(supabase).exchangeRates('EUR', message.currency)
  const user = await get(supabase).user(message.userId);
  if(!user) return 'user not found'
  const autoVestRate = user.autoVest || 1;
  const withdrawAmount = message.amount - (message.amount*(1 - autoVestRate));
  

  const withdrawTransaction = await createWithdrawTransaction(user.id, withdrawAmount, message.currency);
  response.withdrawTransaction = withdrawTransaction || {};
  const updatedTransaction = await updateTransaction(user.id, message.message_entity);
  response.updatedTransaction = updatedTransaction || {};

  const calculateAllocationPercentage = (userFund:any) => {
    const total = userFund.reduce((total:any, { rate }) => total + rate, 0);
    let userDefinedFundPercentage = []
    for (let i = 0; i < userFund.length; i++) {
      const ticker = userFund[i].ticker;
      const allocation = userFund[i].rate / total;
      userDefinedFundPercentage.push({
        'ticker': ticker,
        'allocation': allocation
      })
    }
    return userDefinedFundPercentage
  }

  const userDefinedFund =  await get(supabase).userDefinedFund(user.id)
  if(!userDefinedFund) return 'userDefinedFund not found'

  const allocationPercentage = calculateAllocationPercentage(userDefinedFund)

  for (let i = 0; i < allocationPercentage.length; i++) {
    const entry = allocationPercentage[i];
    if(entry.allocation===0 || !entry.allocation) continue;
    const currencyConvertedSharePrice = assetPrices[entry.ticker] * convertedCurrency;
    const investQuantity =  (message.amount * autoVestRate * entry.allocation) / currencyConvertedSharePrice;
    ok.log('', 'investQuantity '+entry.ticker+': ', investQuantity)
    const exchangeOrder = await createExchangeOrder(user.id, investQuantity, entry.ticker);
    response.exchangeOrders.push(exchangeOrder);
  }
  return allocationPercentage
});
