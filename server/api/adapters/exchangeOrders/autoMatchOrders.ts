import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'autoMatchOrders'
  const topic = 'exchangeOrders'
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity_id)
  if(!message.message_id) return 'fail'

  const readMessage = await messaging.read(
    supabase,
    topic,
    service,
    body.record.message_id)
  
  let json ={
    'order_id': message.message_entity_id,
    'user_id': message.user_id,
    'ticker': message.ticker,
    'order_type': message.order_type,
    'quantity': message.quantity
  }
  
  const servicePubKebab = ok.camelToKebab(service)
  const { data, error } = await supabase
    .from(servicePubKebab)
    .upsert(json)
    .select()
  
  if(data) return data
  if(error) return error
});