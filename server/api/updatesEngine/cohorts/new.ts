import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const {data:usersRaw, error:usersError} = await supabase
    .from('topic_users')
    .select()
    .order('timestamp', {ascending: false})
  
  const merged = ok.merge(usersRaw, 'id')
  
  // filter only users created last 3 days
  const last3Days = ok.filter(merged, (user) => {
    return user.timestamp > Date.now() - 3*24*60*60*1000
  })
  if(merged) return merged
});