import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'
const runtimeConfig = useRuntimeConfig()
const supabase = createClient(runtimeConfig.supabase_url, runtimeConfig.supabase_service_role)

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const user_id = query.user_id
  const days = query.days || 1
  const currency = query.currency || "EUR"
  // rudementary error handling
  if (!user_id){
    oklog('error', 'user_id not defined')
    return {'error': 'user_id not defined'} 
  } 
  if (!days) {
    oklog('error', 'days not defined')
    return {'error': 'days not defined'}
  }
  if (!currency) {
    oklog('', 'currency not defined')
    return {'error': 'currency not defined'}
  }

  // get exchange rates 
  const { data: exchange_rates, error: exchange_rates_error } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('iso', currency)
    .single()

  const exchange_rate = exchange_rates.eq_ddfgi;
  if(exchange_rates_error){
    oklog('error', 'could not get exchange rate for :'+ currency)
  }

  // get all orders 
  const { data: order_flow, error } = await supabase
    .from('exchange')
    .select('order_id, order_type, quantity, created_at, modified_at')
    .eq('user_id', query.user_id)
//    .not('fulfilled_by_order_id', 'is', null );
  const output = [];
  // Add empty date objects based on the query.days parameter
  for (let i = 0; i < days; i++) {
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
  const buy_order = 0;
  const sell_order = 1;
  // push the daily order-totals into the array
  for (const order of order_flow) {
    let quantity;

    const rawDate = new Date(order.modified_at);
    const date = rawDate.toISOString().split("T")[0];

    if(order.order_type===buy_order) {
      quantity = (order.quantity/exchange_rate)
    }
    if(order.order_type===sell_order) {
      quantity = -(order.quantity/exchange_rate)
    }
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
  oklog('success', 'getPortfolio for ' + query.user_id)
  return result.slice(-days);
})