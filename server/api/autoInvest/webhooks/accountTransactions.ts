import { ok } from '~/composables/ok';
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
  ok.log('', 'message:', message)
  const transactionComplete = (status) => {
    if(status==='complete') return true
    return false
  }
  if(!transactionComplete(message.status)) return 'wrong payment status'

  const getAssetPrice = async (currency , ticker) => {
    const { data, error } = await supabase
      .from('getAssetPrice')
      .select()
      .eq('currency', currency)
      .eq('ticker', ticker)
      .order('date', { ascending: false })
      .limit(1)
      .single();
    if(error) {
      ok.log('error', 'could not find asset price', error)
      return null
    } else {
      return data.price
    }
  }
  const assetPrice = await getAssetPrice(message.currency, 'gi.ddf');

  const createExchangeOrder = async () => {
    const quantity = (message.amount * message.autoInvest) / assetPrice;
    if(quantity===0 || !assetPrice) return null
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/webhooks/accountTransactions.ts'
    }).exchangeOrders({
      ticker: 'gi.ddf',
      type: 'buy',
      status: 'open',
      userId: message.userId,
      quantity: quantity
    });
    if(error){
      return error
    } else {
      return 'data'
    }
  };
  const createWithdrawTransaction = async () => {
    const { error } = await pub(supabase, {
      sender:'server/api/autoInvest/accountTransactions.ts'
    }).accountTransactions({
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
      return 'data'
    }
  };
  const exchangeOrder = await createExchangeOrder();
  if(!exchangeOrder) return 'exchangeOrder'
  const withdrawTransaction = await createWithdrawTransaction();
  return {
    'exchangeOrder': exchangeOrder,
    'withdrawTransaction': withdrawTransaction
  }
});
