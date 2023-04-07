import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const { data, error } = await supabase
    .from('get_user')
    .insert({
      user_id: body.record.message_entity_id
    })
    .select()

  if(data) return data
  if(error) return error
});