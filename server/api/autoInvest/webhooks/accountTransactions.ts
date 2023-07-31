import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messagingNext';
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
    if(status==='payment_accepted') return true
    if(status==='withdrawal_accepted') return true
    return false
  }
  if(!transactionComplete(message.transactionStatus)) return 'wrong payment status'

  const assetPrice = await messaging.getAssetPrice(supabase, message.currency, 'gi.ddf');

  const topicPubKebab = ok.camelToKebab(topicPub);

  const createExchangeOrder = async () => {
    const quantity = message.amount * message.auto_invest * assetPrice;
    if(json.quantity===0) return 'thats not a transaction ;)'
    const { error, data } = await pub(supabase, {sender:'server/api/autoInvest/webhooks/accountTransactions.ts'}).exchangeOrder({
      'ticker': 'gi.ddf',
      'type': 'buy',
      'status': 'open',
      'userId': message.userId,
      'quantity': quantity
    });
  }
  const createWithdrawTransaction = async () => {
    const { data: withdrawTransaction, error: withdrawTransactionError } = await supabase
    .from('topic_accountTransactions')
    .insert({
      'message_sent': ok.timestamptz(),
      'message_sender': 'autoInvest',
      'userId': message.userId,
      'amount': -message.amount * message.auto_invest,
      'currency': message.currency,
      'auto_invest': 0,
      'type': 'withdraw',
      'status': 'withdrawal_accepted',
      'subType': 'autoInvested',
    })
    .select();
  }
  if (data) return data;
  if (error) return error;
});