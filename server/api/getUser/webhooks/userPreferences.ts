import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'userPreferences'
  const service = 'getUser'
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  
  const json = await ok.cleanMessage(message)

  const { data, error } = await supabase
    .from(service)
    .upsert(json)

  if(data) return data
  if(error) return error
});