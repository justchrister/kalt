import { ok } from '~/composables/ok'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseClient(event)
  const query = getQuery(event)
  if(!query.user_id) 'user_id missing'
  if(!query.currency) 'currency missing'
  
  const { data:exchangeRate, error: exchangeRateError } = await supabase
    .from('exchange_rates')
    .select()
  
  const { data, error } = await supabase
    .from('get_portfolio_daily')
    .select()
  
  if(data) return data
  if(error) return error
});