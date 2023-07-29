import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { message } from '~/composables/messagingNext'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'userPreferences'
  const topicKebab = ok.camelToKebab(topic)
  const service = 'getUser'
  const serviceKebab = ok.camelToKebab(service)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id)
  await messaging.read(supabase, topic, service, body.record.message_id)
  const json = await messaging.cleanMessage(message)

  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .eq('user_id', message.user_id)
    .select()
  console.log(message)
  if(data) return data
  if(error) return error
});