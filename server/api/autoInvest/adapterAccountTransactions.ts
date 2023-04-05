import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const { data: subscription, error: subscriptionError } = await supabase
    .from('account_transactions__auto_invest')
    .update({ message_read: true })
    .eq('message_id', body.record.message_id)
    .select()

  if(subscriptionError) return ok.log('error', subscriptionError.message)

  let json = {
    'message_created': ok.timestamptz(),
    'message_sender': 'autoInvest',
    'ticker': 'ddf_global_index',
    'order_type': 'buy',
    'order_status': 'open',
    'user_id': null,
    'quantity': null
  }
  
  const { data: messages, error: messagesError } = await supabase
    .from('account_transactions')
    .select()
    .eq('message_entity_id', body.record.message_entity_id)
    .order('message_created', { ascending: true })

  if(messagesError) return 'fetching messages failed: '+messagesError.message
  
  const message = await ok.combineEntity(messages)
  if(message.transaction_status!='payment_accepted') return 'wrong payment status'
  
  const { data: exchangeRate, error: exchangeRateError } = await supabase
    .from('exchange_rates')
    .select('ddf_global_index') //should be fetched from profile, when user has option to invest in more than ddf global index
    .eq('iso', message.currency)
    .limit(1)
    .single()
    
  if(exchangeRateError) return exchangeRateError.message

  json.user_id = message.user_id
  json.quantity = message.amount * message.auto_invest_percentage * exchangeRate.ddf_global_index
  
  const { data, error } = await supabase
    .from('exchange_orders')
    .insert(json)
    .select()
  console.log(data)
  console.log(error)
  const { data: autoInvestTable, error: autoInvestTableError } = await supabase
    .from('auto_invest')
    .insert({
      'exchange_order_id': message.entity_id,
      'account_transaction_id': body.record.message_entity_id
    })
  
  if(data) return data
  if(error) return error
});