import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const {data:usersRaw, error:usersError} = await supabase
    .from('topic_users')
    .select()
  
  const usersMerged = ok.merger(usersRaw, 'id')
  const users = usersMerged[0]

  ok.log('', users)
  const updateCohorts = async () => {
    
  }
  if(users) return users
  if(usersError) return usersError
});