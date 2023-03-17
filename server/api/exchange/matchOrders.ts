// @ts-nocheck

import { oklog } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const buyOrder = 0
  const sellOrder = 1
  let fulfilling_order_type = sellOrder
  if(body.record.order_type===sellOrder) fulfilling_order_type=buyOrder

  
  const { data:fulfilling_order, error: fulfilling_order_error} = await supabase
    .from('exchange')
    .select()
    .is('fulfilled_by_order_id', null)
    .eq('order_type', fulfilling_order_type)
    .neq('user_id', body.record.user_id)   //  Without these two rows, it will match with itself :)
    .neq('order_id', body.record.order_id)
    .gte('quantity', body.record.quantity)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()
  if(fulfilling_order) oklog('success', 'found fulfilling order: ' + fulfilling_order.order_id)
  if(fulfilling_order_error) {
    oklog('error', 'could not find fulfilling order')
    return {
      'error': 'could not find fulfilling order'
    }
  }
  
  const fulfillOrders = async (order, f_order) => {
    const {data: org, error: org_err } = await supabase.from('exchange')
      .update({fulfilled_by_order_id: f_order})
      .eq('order_id', order)
      .select()
      .single()
    const {data: full, error: full_err } = await supabase.from('exchange')
      .update({ 
        fulfilled_by_order_id: order, 
        quantity: body.record.quantity 
      })
      .eq('order_id', f_order)
      .select()
      .single()
  }
  const createOrder = async (user_id, order_type, quantity) => {
    const {data, error} = await supabase.from('exchange')
      .insert([{ 
        user_id: user_id, 
        order_type: order_type, 
        ticker: "DDFGI", 
        quantity: quantity,
        created_at: new Date }])
      .select()
      .single()
    oklog('success', 'created order: ' + data.order_id)
  }
  if(fulfilling_order.order_id){
    const fulfilling_order_id = fulfilling_order.order_id
    await fulfillOrders (body.record.order_id, fulfilling_order.order_id)
    oklog('success', 'matched orders: ' + body.record.order_id + " with " + fulfilling_order.order_id)
    let new_order_quantity = fulfilling_order.quantity - body.record.quantity
    if(new_order_quantity!=0){
      await createOrder(fulfilling_order.user_id, fulfilling_order_type, new_order_quantity) 
    }
    return 'orders matched'
  }
  return 'no matches found'
});

/*

The latest issue here is that it 
somewhere along the way the order_type
is set to null..

*/