import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'userDetails'
  const topicKebab = ok.camelToKebab(topic)
  const service = 'getUser'
  const serviceKebab = ok.camelToKebab(topic)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id)
  const readMessage = await messaging.read(supabase, topic, service, body.record.message_id)

  let json = {}
  if(message.auto_invest) json.auto_invest = message.auto_invest
  if(message.email_marketing) json.email_marketing = message.email_marketing
  if(message.color_schema) json.color_schema = message.color_schema
  if(message.language) json.language = message.language
  if(message.currency) json.currency = message.currency

  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .eq('user_id', message.user_id)
    .select()

  if(data) return data
  if(error) return error
});