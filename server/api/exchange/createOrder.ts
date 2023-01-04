import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const query = getQuery(event)
  const body = await readBody(event)

  // insert order object into supabase db
  const {data, error} = await supabase.from('exchange').insert([
    {
      user_id: body.user_id,
      order_type: body.order_type,
      ticker: body.ticker,
      quantity: body.quantity,
      created_at: new Date
    },
  ]).select().single()
  let response = "N/A";
  if ( error ) response = error
  if ( data ) response = data
  return response
});