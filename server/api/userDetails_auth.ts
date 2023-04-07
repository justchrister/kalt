/*

  Technically not a topic, but treating it as one

*/


import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const { data, error } = await supabase
    .from('user_details')
    .insert({
      user_id: body.record.id
    })
    .select()

  if(data) return data
  if(error) return error
});