import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'autoInvest'
  const topicSub = 'accountTransactions'
  const topicPub = 'exchangeOrders'
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await messaging.getEntity(
    supabase,
    topicSub,
    body.record.message_entity_id)
  
  const readMessage = await messaging.read(
    supabase,
    topicSub,
    service,
    body.record.message_id)

  if(message.transaction_status!='payment_accepted') return 'wrong payment status'
  
  const assetPrice = await messaging.getAssetPrice(supabase, message.currency, 'gi.ddf')

  let json = {
    'message_created': ok.timestamptz(),
    'message_sender': 'autoInvest',
    'ticker': 'gi.ddf',
    'order_type': 'buy',
    'order_status': 'open',
    'user_id': message.user_id,
    'quantity': message.amount * message.auto_invest * assetPrice
  }
  const topicPubKebab = ok.camelToKebab(topicPub)
  const { data, error } = await supabase
    .from(topicPubKebab)
    .insert(json)
    .select()

  const { data:wtihdrawTransaction, error:wtihdrawTransactionError } = await supabase
    .from('account_transactions')
    .insert({
      'message_created': ok.timestamptz(),
      'message_sender': 'autoInvest',
      'user_id': message.user_id,
      'amount': -message.amount*message.auto_invest,
      'currency': message.currency,
      'auto_invest': 0,
      'transaction_type': 'withdraw',
      'transaction_status': 'withdrawal_accepted',
      'transaction_sub_type': 'auto_invested'
    })
    .select()
  if(data) return data
  if(error) return error
});