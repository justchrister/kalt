import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)

  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw");

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