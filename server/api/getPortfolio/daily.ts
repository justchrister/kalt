import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const user = serverSupabaseUser(event)
  
  const query = getQuery(event)
  const body = await readBody(event)
  export default defineEventHandler(async (event) => {
    return await serverSupabaseUser(event)
  })
  if(data) return data
  if(error) return error
});