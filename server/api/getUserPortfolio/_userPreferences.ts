import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'
// this one should get the new currency and replace that in the value_currency column
export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const service = 'getUserPortfolio';
  const topic = 'exchangeOrders';
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = messaging.getEntity(
    topic,
    service,
    body.record.message_entity_id
  )
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update({ 'currency_value': message.currency })
    .eq('user_id', message.user_id);

  if(data) return data
  if(error) return error
});