import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)
  const client = serverSupabaseClient(event)
  
  const { data:user } = await client 
    .from('topic_users')
    .select()
    .eq('id', userId)
    .order('timestamp', { ascending: true })
  return user
});