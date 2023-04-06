import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await messaging.getEntity(
    supabase,
    'accountTransactions', 
    'autoInvest', 
    body.record.message_entity_id)

  const readMessage = await messaging.read(
    supabase,
    body.record.message_id)
    

  if(message.transaction_status!='payment_accepted') return 'wrong payment status'
  
  const assetPrice = messaging.getAssetPrice(message.currency)

  let json = {
    'message_created': ok.timestamptz(),
    'message_sender': 'autoInvest',
    'ticker': 'ddf_global_index',
    'order_type': 'buy',
    'order_status': 'open',
    'user_id': message.user_id,
    'quantity': message.amount * message.auto_invest_percentage * assetPrice
  }
  
  const { data, error } = await supabase
    .from('exchange_orders')
    .insert(json)
    .select()
  
  if(data) return data
  if(error) return error
});