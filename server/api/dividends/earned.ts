import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const earned = body.earned;
  const currency = body.currency;
  const node = body.node_id;

  if (!node){
    ok.log('error', 'node id missing from body')
    return {
      'error' : 'node id missing from body'
    }
  }
  if (!currency){
    ok.log('error', 'currency missing from body')
    return {
      'error' : 'currency missing from body'
    }
  }
  
  const {data, error} = await supabase
    .from('dividends')
    .insert({ 
      'node_id': node,
      'amount': earned,
      'currency': currency,
      'status': 0
    })
    .select()
    .single()
  if(error){
    ok.log('error', 'dividend not registered: ' + error.message)
    return {
      "error": error.message
    }
  }
  ok.log('success', 'dividend registered: ' + data.dividend_id)
  return data
  });