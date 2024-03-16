import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const data = await supabase
    .from('auth.users')
    .select()

  ok.log('', data)
  if(data) return data
  if(error) return error
});