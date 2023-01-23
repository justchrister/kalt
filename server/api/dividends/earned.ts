import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const earnedAmount = body.amount;
  const currency = body.currency;
  const node = body.node_id;

  if (!node){
    oklog('error', 'node id missing from body')
    return {
      'error' : 'node id missing from body'
    }
  }
  if (!currency){
    oklog('error', 'currency missing from body')
    return {
      'error' : 'currency missing from body'
    }
  }

  const {data, error} = await supabase
    .from('dividends')
    .insert({ 
      'node_id': node,
      'amount': earnedAmount,
      'currency': currency,
      'status': 0
    })
    .select()
    .single()
  if(error){

    oklog('error', 'dividend not registered')
    // should add additional 
  }
  oklog('error', 'dividend registered: ' + data.dividend_id)
  return data
  });