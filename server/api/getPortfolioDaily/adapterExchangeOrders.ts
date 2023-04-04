import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const { data: subscription, error: subscriptionError } = await supabase
    .from('exchange_orders__get_portfolio_daily')
    .update({ message_read: true })
    .eq('message_id', body.record.message_id)
  
  if(subscriptionError) return ok.log('error', subscriptionError.message)

  let json = {
    'date': null,
    'user_id': null,
    'quantity': null,
    'ticker': null
  }
  const { data: message, error: messageError } = await supabase
    .from('exchange_orders')
    .select()
    .eq('message_entity_id', body.record.message_entity_id)
    .order('message_created', { ascending: false })

  if(!message.length) return 'order not fulfilled'
  if(messageError) return messageError.message
  
  for (let i = 0; i < message.length; i++) {
    json.user_id = message[i].user_id
    json.date = message[i].message_created
    json.quantity = message[i].quantity
    json.ticker = message[i].ticker

    if(message[i].order_type==='buy'){
      json.quantity = message[i].quantity
    }
    if(message[i].order_type==='sell'){
      json.quantity = -message[i].quantity
    }
  }

  if(!json.user_id) return 'missing a primary key'
  if(!json.ticker) return 'missing a primary key'
  if(!json.date) return 'missing a primary key'

  const { data:dateExists, error:dateExistsError } = await supabase
    .from('get_portfolio_daily')
    .select('quantity')
    .eq('date', json.date)
    .eq('user_id', json.user_id)
    .eq('ticker', json.ticker)
    .single()

  if(dateExists) json.quantity += dateExists.quantity
  
  const { data, error } = await supabase
    .from('get_portfolio_daily')
    .upsert(json)

  if(data) return data
  if(error) return error

});