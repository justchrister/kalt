import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw")

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const {data, error} = await supabase.from('transactions').select('*').eq('user_id', query.user_id)
  .order('created_at', { ascending: false })
  let response = 'Error getting transactions'
  if (data) response = data
  console.log(response)
  return {
    api: response
  }
})