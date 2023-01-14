import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(runtimeConfig.supabase_url, runtimeConfig.supabase_service_role)
  const query = getQuery(event)

  // rudementary error handling
  if (!query.user_id) return {'error': 'user_id not defined'} 
  if (!query.days) return {'error': 'days not defined'} 


  // get all transactions 
  const { data: order_flow, error } = await supabase
    .from('exchange')
    .select('order_id, order_type, quantity, created_at, modified_at')
    .eq('user_id', query.user_id)
    .not('fulfilled_by_order_id', 'is', null );
  const output = [];

  // Add empty date objects based on the query.days parameter
  for (let i = 0; i < query.days; i++) {
    const rawDate = new Date();
    rawDate.setDate(rawDate.getDate() - i)
    const date = rawDate.toISOString().split("T")[0]
    output.push(
      { 
        "date": date,
        "quantity": 0
      }
    )
  }

  // push the daily order-totals into the array
  for (const element of order_flow) {
    const rawDate = new Date(element.modified_at);
    const date = rawDate.toISOString().split("T")[0];
    let quantity;
    if(element.order_type===0) quantity = element.quantity
    if(element.order_type===1) quantity = -element.quantity
    output.push(
      { 
        "date": date,
        "quantity": quantity 
      }
    );
  }

  // sort the array based on date value
  output.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

  // combine duplicates in the array
  let response = [];

  for (let i = 0; i < output.length; i++) {
    let date = output[i].date;
    let quantity = output[i].quantity;

    let found = false;
    for (let j = 0; j < response.length; j++) {
      if (response[j].date === date) {
        response[j].quantity += quantity;
        found = true;
        break;
      }
    }

    if (!found) {
      response.push({
        "date": date,
        "quantity": quantity
      });
    }
  }
  response.reverse();
  let result = [];
  let previousQuantity = 0;

  for (let i = 0; i < response.length; i++) {
    let date = response[i].date;
    let quantity = response[i].quantity;
    let combinedQuantity = previousQuantity + quantity;

    result.push({
        "date": date,
        "quantity": combinedQuantity
    });
    
    previousQuantity = combinedQuantity;
  }
  return result.slice(4);
})