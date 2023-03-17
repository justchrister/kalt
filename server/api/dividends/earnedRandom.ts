// @ts-nocheck

import { oklog } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const random_uuid = uuidv4()

  function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const {data: random_nodes, error: random_nodes_error} = await supabase
    .from('nodes')
    .select('node_id')
    .gte('node_id', random_uuid)
  if(random_nodes_error){
    oklog('error', 'could not get a random node_id: '+ random_error.message)
    return {
      "error": random_nodes_error.message
    }
  }
  const {data: currencies, error: currencies_error} = await supabase
    .from('currencies')
    .select()
    .eq('available', true)

  let node_id, currency, amount;
  let result = []
  let count = 0;
  const minRandomDividend = 15;
  const maxRandomDividend = 150;
  for (let i = 0; i < random(minRandomDividend,maxRandomDividend); i++) {
    node_id = random_nodes[random(0, random_nodes.length-1)].node_id; 
    currency = currencies[random(0, currencies.length-1)].iso;
    amount = random(2, 200)
    
    const {data, error} = await supabase
      .from('dividends')
      .insert({ 
        'node_id': node_id,
        'amount': amount,
        'currency': currency,
        'status': 0
      })
      .select()
      .single()

    if (error) oklog('warn', 'failed to create dividend')
    if (data) {
      result.push({
        'dividend_id': data.dividend_id,
        'amount': amount,
        'currency': currency
      })
      count = count + 1
      oklog('success', 'dividend registered')
    }
  }
  return { 'created dividends' : count, result }
});