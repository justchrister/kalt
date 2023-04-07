import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = messaging.getEntity(
    supabase,
    'userPreferences',
    'getUserPortfolio',
    body.record.message_entity_id
  )
  if(!message.preferred_currency) return 'different field'

  const readMessage = await messaging.read(
    supabase,
    body.record.message_id)

  if(data) return data
  if(error) return error

});