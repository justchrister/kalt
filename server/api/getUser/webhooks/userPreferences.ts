import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'userPreferences'
  const service = 'getUser'
  const body = await readBody(event)
  if(body.message_read) return 'message already read'
  
  const message = await sub(supabase, topic).entity(body.message_entity);
  await sub(supabase, topic).read(service, body.message_id);
    
  const json = await ok.cleanMessage(message)

  const { data, error } = await supabase
    .from(service)
    .upsert(json)
    .eq('userId', json.userId)
    .select()

  if(error) {
    return error
  } else {
    return data
  }
});