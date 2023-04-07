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

  let json = {
    'user_id': message.user_id,
    'amount': message.amount,
    'currency': message.currency
  }

  const { data: current, error: currentError } = await supabase
    .from('get_account_balance')
    .select('currency')
    .eq('user_id', body.record.user_id)
    .single()
  
  if(current){
    const currencyConverted = await messaging.convertCurrency(
      supabase,
      json.amount,
      message.currency,
      current.currency
    )
    json.amount += current.amount
  }

  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .select()
  
  if(data) return data
  if(error) return error
});