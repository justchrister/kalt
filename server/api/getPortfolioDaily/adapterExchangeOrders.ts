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
    'ticker': null,
    'type': null
  }

  const { data: message, error: messageError } = await supabase
    .from('exchange_orders')
    .select()
    .eq('message_entity_id', subscription.message_entity_id)
    .eq('order_status', 'fulfilled')
    .order('date', { ascending: false })

  for (let i = 0; i < message.length; i++) {
    json.user_id = message[i].user_id
    json.date = message[i].message_created
    json.quantity = message[i].quantity
    json.ticker = message[i].ticker
    json.type = message[i].order_type

    if(data[i].order_type='buy'){
      json.quantity = data[i].quantity
    }
    if(data[i].order_type='sell'){
      json.quantity = -data[i].quantity
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
  
  if(dateExists.quantity) json.quantity +=  dateExists.quantity

  const { data, error } = await supabase
    .from('get_portfolio_daily')
    .insert({ json })

  if(data) return data
  if(error) return error

});