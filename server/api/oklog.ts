import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const json={
    "uuid": body.uuid,
    "type": body.type,
    "text": body.text
  }
  const {data, error} = await supabase.from('oklog').insert(json)
  if(data) return data
  if(error) return error
  return json
});