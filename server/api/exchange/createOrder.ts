// @ts-nocheck

import { oklog } from '~/composables/oklog'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  
  if (!body.record.amount){
    oklog('error', 'amount is under 1')
    return {
      'error' : 'amount is under 1'
    }
  }
  if (!body.record.currency){
    oklog('error', 'missing currency')
    return {
      'error' : 'missing currency'
    }
  }
  if (!body.record.transaction_id){
    oklog('error', 'missing transaction_id')
    return {
      'error' : 'missing transaction_id'
    }
  }
  // get incomplete order data

  const {data: transaction_incomplete, error: transaction_incomplete_error } = await supabase
    .from('transactions')
    .update({ 'transaction_status': 3 })
    .is('exchange_order', null)
    .eq('transaction_id', body.record.transaction_id)
    .eq('transaction_status', 1) // when we have stripe integration, this should be set to 2 when transaction is completed
    .select('*')
    .single()
  if (transaction_incomplete) oklog('success', 'found transaction: ' + transaction_incomplete.transaction_id)
  if (transaction_incomplete_error){
    oklog('error', 'could not find incomplete transaction: ' + body.record.transaction_id)
    return {
      'error': 'could not find incomplete transaction'
    }
  } 
  const {data:exchange_rates } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('iso', body.record.currency)
    .single()

  if (exchange_rates) oklog('success', 'got exchange rates')
  if (transaction_incomplete_error){
    oklog('error', 'could not get exchange rates')
    return {
      'error': 'could not get exchange rates'
    }
  }
  let order_type = 0
  if (transaction_incomplete.transaction_type===1) order_type = 1
  if (transaction_incomplete.transaction_type===2) order_type = 2
  // insert order object into supabase db
  const createOrder = async () => { 
    const {data, error} = await supabase.from('exchange').insert([
      {
        user_id: transaction_incomplete.user_id,
        order_type: transaction_incomplete.transaction_type,
        ticker: "DDFGI",
        quantity: transaction_incomplete.amount * exchange_rates.eq_ddfgi,
        created_at: new Date
      },
    ]).select().single()

    if (data) oklog('success', 'order created: ' + data.order_id)
    return data
  }

  // create order and update the 
  if (transaction_incomplete){
    const order = await createOrder()
    const { data, error } = await supabase
      .from('transactions')
      .update({
        transaction_id: transaction_incomplete.transaction_id,
        exchange_order: order.order_id,
        transaction_status: 3
      })
      .select()
      .single()

    if (data) oklog('success', 'transaction updated: ' + data.transaction_id)
    return {
      'order_created': {
        order
      },
      'transaction_updated': {
        data
      }
    }
  }
  });