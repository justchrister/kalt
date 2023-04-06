import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = messaging.getEntity(
    'exchangeOrders', 
    'getUserPortfolio',
    body.record.message_entity_id
  )

  let json = {
    'date': message.message_created,
    'user_id': message.user_id,
    'quantity': message.quantity,
    'ticker': message.ticker
  }

  const { data:dateExists, error:dateExistsError } = await supabase
    .from('get_user_portfolio')
    .select('quantity')
    .eq('date', json.date)
    .eq('user_id', json.user_id)
    .eq('ticker', json.ticker)
    .single()

  if(dateExists) json.quantity += dateExists.quantity
  
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .upsert(json)
    .select()
    .single()

  if(data) return data
  if(error) return error

});