import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const { data: subscription, error: subscriptionError } = await supabase
    .from('exchange_orders__get_portfolio_latest')
    .update({ message_read: true })
    .eq('message_id', body.record.message_id)
    .select()
  
  if(subscriptionError) return ok.log('error', subscriptionError.message)

  let json = {
    'user_id': null,
    'quantity': null,
    'ticker': null
  }
  const { data: messages, error: messagesError } = await supabase
    .from('exchange_orders')
    .select()
    .eq('message_entity_id', body.record.message_entity_id)
    .order('message_created', { ascending: true })

  if(!messages.length) return 'order not fulfilled'
  if(messagesError) return messagesError.message
  
  const message = await ok.combineEntity(messages)
  
  json.user_id = message.user_id
  json.ticker = message.ticker
  json.quantity = message.quantity

  if(!json.user_id) return 'missing a primary key'
  if(!json.ticker) return 'missing a primary key'
  
  const { data:dateExists, error:dateExistsError } = await supabase
    .from('get_portfolio_latest')
    .select('quantity')
    .eq('user_id', json.user_id)
    .eq('ticker', json.ticker)
    .single()

  if(dateExists) json.quantity += dateExists.quantity

  const { data, error } = await supabase
    .from('get_portfolio_latest')
    .upsert(json)
    .select()
    .single()

  if(data) return data
  if(error) return error

});