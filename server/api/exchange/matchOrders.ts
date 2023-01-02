
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)

  const query = getQuery(event)

  const body = await readBody(event)

  let response;

  const getFulfillingOrder = async (fulfiller_type) => {
    const { data, error} = await supabase
      .from('exchange')
      .select()
      .is('fulfilled_by_order_id', null)
      .eq('order_type', fulfiller_type)
      .neq('user_id', body.record.user_id)   //  Without these two rows, it will match with itself :)
      .neq('order_id', body.record.order_id)
      .gte('quantity', body.record.quantity)
      .order('created_at', { ascending: true })
      .limit(1)
      .single()
    return data
  }
  
  const fulfillOrders = async (order, fulfiller) => {
    const {data: org, error: org_err } = await supabase.from('exchange').update({ fulfilled_by_order_id: fulfiller }).eq('order_id', order).select().single()
    const {data: full, error: full_err } = await supabase.from('exchange').update({ fulfilled_by_order_id: order, quantity: body.record.quantity }).eq('order_id', fulfiller).select().single()
  }
  
  const createOrder = async (user_id, order_type, quantity) => {
    const {data, error} = await supabase.from('exchange').insert([
      { user_id: user_id, order_type: order_type, ticker: "DDFGI", quantity: quantity,
        created_at: new Date },
    ]).select().single()
  }

  let fulfiller_type = 1

  if(body.record.order_type===1) fulfiller_type = 0
  let fulfiller  = await getFulfillingOrder(fulfiller_type)
  // if we need to split it: 
  
  if (fulfiller.order_id){
    console.log("fulfiller found "+ fulfiller.order_id)
    await fulfillOrders (fulfiller.order_id, body.record.order_id)
    // if the order initating this post request has a lower quantity than the one we want to be fulfilled by, we split the fulfilling order into two orders. 
    let new_order_quantity = fulfiller.quantity - body.record.quantity
    if(new_order_quantity!=0) await createOrder(fulfiller.user_id, fulfiller_type, new_order_quantity) 
    // here we need to also update the quantity of the original order, and probably add a split into column for tracability (?)

    return 'orders matched'
  }
  return 'no matches found'



});