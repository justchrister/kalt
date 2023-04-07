import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'getAccountBalance'
  const serviceKebab = ok.camelToKebab(service)
  const topicSub = 'accountTransactions'
  const query = getQuery(event)
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'

  const message = await messaging.getEntity(
    supabase,
    topicSub,
    body.record.message_entity_id)

  const readMessage = await messaging.read(
    supabase,
    topicSub,
    service,
    body.record.message_id)
  
  if(message.transaction_status!='payment_accepted') return 'wrong payment status'

  let json = {
    'user_id': message.user_id,
    'amount': parseFloat(message.amount),
    'currency': message.currency
  }
  ok.log('success', 'msg ', message.currency)
  const { data: current, error: currentError } = await supabase
    .from('get_account_balance')
    .select()
    .eq('user_id', message.user_id)
    .limit(1)
    .single()
  
  ok.log('success', 'yay', current)
  
  
  if(current){
    const currencyConverted = await messaging.convertCurrency(
      supabase,
      json.amount,
      json.currency,
      current.currency
    )
    json.amount += currencyConverted
  }
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .select()
  
  if(data) return data
  if(error) return error
});