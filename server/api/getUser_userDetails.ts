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
  
  const message = await messaging.getEntity(
    supabase,
    topicSub,
    body.record.message_entity_id)
  
  const readMessage = await messaging.read(
    supabase,
    topicSub,
    service,
    body.record.message_id)
  let json = {

  }
  if(message.user_id)     json.user_id =    message.user_id
  if(message.first_name)  json.first_name = message.first_name
  if(message.last_name)   json.last_name =  message.last_name
  if(message.country)   json.country =  message.country
  if(message.city)   json.city =  message.city
  if(message.postal_code)   json.postal_code =  message.postal_code
  if(message.birthdate)   json.birthdate =  message.birthdate
  if(message.address_line_1)   json.address_line_1 =  message.address_line_1
  if(message.address_line_2)   json.address_line_2 =  message.address_line_2

  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .select()

  if(data) return data
  if(error) return error
});