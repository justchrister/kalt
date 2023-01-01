
import { createClient } from '@supabase/supabase-js'
export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)
  let response;
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw")


  const getFulfillingOrder = async (fulfiller_type, req_order_user_id, req_order_order_id, req_order_quantity) => {
    const { data } = await supabase
      .from('exchange')
      .select('*')
      .is('fulfilled_by_order_id', null)
      .eq('order_type', fulfiller_type)
      .neq('user_id', req_order_user_id)   //  Without these two rows, it will match with itself :)
      .neq('order_id', req_order_order_id) //    ^
      .gte('quantity', req_order_quantity)
      .order('created_at', { ascending: true })
      .limit(1)
    return data
  }
  
  const fulfillOrders = async (order, fulfiller) => {
    await supabase.from('exchange').update({ fulfilled_by_order_id: fulfiller }).eq('order_id', order)
    await supabase.from('exchange').update({ fulfilled_by_order_id: order }).eq('order_id', fulfiller)
  }
  
  const createOrder = async (user_id, order_type, quantity) => {
    await supabase.from('exchange').insert([
      { user_id: user_id, order_type: order_type, ticker: "DDF_Global_Index", quantity: quantity,
        created_at: new Date },
    ])
  }

  let req_order = body.record
  let fulfiller_type = 1
  if(body.record.order_type===1) fulfiller_type = 0
  let fulfiller  = await getFulfillingOrder(fulfiller_type, req_order.user_id, req_order.order_id, req_order.quantity)
  // if we need to split it: 
  
  
  if (fulfiller.length){
    await fulfillOrders (fulfiller[0].order_id, req_order.order_id)
    // if the order initating this post request has a lower quantity than the one we want to be fulfilled by, we split the fulfilling order into two orders. 
    let new_order_quantity = fulfiller[0].quantity - req_order.quantity
    if(new_order_quantity!=0) await createOrder(fulfiller[0].user_id, fulfiller_type, new_order_quantity) 
    // here we need to also update the quantity of the original order, and probably add a split into column for tracability (?)

    response = "order matched";
  }
  response = "no matches made";



  return {
    api: response
  }
});