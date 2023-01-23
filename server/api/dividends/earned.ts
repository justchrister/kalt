import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const earned = body.earned;
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
  if(node==="random"){
    const random_uuid = uuidv4()

    const {data: random, error: random_error} = await supabase
      .from('nodes')
      .select('node_id')
      .gte('node_id', random_uuid)
      .limit(1)
    if(random){
      oklog('success', 'got a random node_id: '+ random[0].node_id)
    }
    if(random_error){
      oklog('error', 'could not get a random node_id: '+ random_error.message)
      return {
        "error": random_error.message
      }
    }
    const {data: random_dividend, error: random_dividend_error} = await supabase
      .from('dividends')
      .insert({ 
        'node_id': random[0].random_id,
        'amount': earned,
        'currency': currency,
        'status': 0
      })
      .select()
      .single()
      
    if(random_error){
      oklog('error', 'could not get a random node_id: '+ random_error.message)
      return {
        "error": random_error.message
      }
    }
    oklog('success', 'created a random dividend: '+ random_dividend.dividend_id)
    return random_dividend
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
    oklog('error', 'dividend not registered: ' + error.message)
    return {
      "error": error.message
    }
  }
  oklog('success', 'dividend registered: ' + data.dividend_id)
  return data
  });