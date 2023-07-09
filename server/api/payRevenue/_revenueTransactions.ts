import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const topic = 'revenueTransactions';
  const service = 'payRevenue';
  const body = await readBody(event)


  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);

  const readMessage = await messaging.read(supabase, topic, service, body.record.message_id);

  console.log(message)
  return message  
  if(data) return data
  if(error) return error
});