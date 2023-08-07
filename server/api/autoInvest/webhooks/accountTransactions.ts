import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoInvest';
  const topicSub = 'accountTransactions';
  const topicPub = 'exchangeOrders';
  const query = getQuery(event);
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const transactionComplete = (status) => {
    if(status==='complete') return true
    return false
  }
  if(!transactionComplete(message.status)) return 'wrong payment status'

  const getAssetPrice = async (currency, ticker) => {
    const { data, error } = await supabase
      .from('getAssetPrice')
      .select()
      .eq('currency', currency)
      .eq('ticker', ticker)
      .order('date', { ascending: false })
      .limit(1)
      .single();
    if(error) {
      return error
    } else {
      return data.price
    }
  }
  const assetPrice = await ok.getAssetPrice(message.currency, 'gi.ddf');

  const topicPubKebab = ok.camelToKebab(topicPub);

  const createExchangeOrder = async () => {
    const quantity = message.amount * message.autoInvest * assetPrice;
    if(json.quantity===0) return 'thats not a transaction ;)'
    const { error, data } = await pub(supabase, {sender:'server/api/autoInvest/webhooks/accountTransactions.ts'}).exchangeOrder({
      'ticker': 'gi.ddf',
      'type': 'buy',
      'status': 'pending',
      'userId': message.userId,
      'quantity': quantity
    });
    if(error){
      return error
    } else {
      return data
    }
  }
  const createWithdrawTransaction = async () => {
    const { error, data } = await pub(supabase, {sender:'server/api/autoInvest/accountTransactions.ts'}).accountTransaction({
      'userId': message.userId,
      'amount': -message.amount * message.autoInvest,
      'currency': message.currency,
      'autoInvest': 0,
      'type': 'withdraw',
      'status': 'complete',
      'subType': 'autoInvested',
    });
    if(error){
      return error
    } else {
      return data
    }
  }
  const exchangeOrder = await createExchangeOrder();
  const withdrawTransaction = await createWithdrawTransaction();
  return {
    'exchangeOrder': exchangeOrder,
    'withdrawTransaction': withdrawTransaction
  }
});