import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const currency = body.record.currency;
  const orderTypeSell = 1;
  const orderTypeBuy = 0;

  if (!currency){
    oklog('error', 'currency missing from body')
    return {
      'error' : 'currency missing from body'
    }
  }
  
  function orderStatusToText(order_fulfilled) {
    if(order_fulfilled) return "fulfilled" 
    return "unfulfilled"
  }
  function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if(random(0,420)===69) return "not going to pay out dividends this time, try again :) "

  const getFilteredOrderFlow = async () => {
    let orders = []
    const { data, error } = await supabase
      .from('exchange')
      .select()
    for (let i = 0; i < data.length; i++) {
      const user_id = data[i].user_id;
      const orderQuantity = data[i].quantity
      const orderType = data[i].order_type;
      const orderStatus = orderStatusToText(data[i].fulfilled_by_order_id)
      if (orderType === orderTypeSell && orderStatus === "unfulfilled"){
        orders.push({
          'user_id': user_id,
          'quantity' : orderQuantity
        })
      }
      if (orderType === orderTypeBuy && orderStatus === "fulfilled"){
        orders.push({
          'user_id': user_id,
          'quantity' : orderQuantity
        })
      }
      
    }
    return orders
  }

  const getTotalVolume = async (orderFlow) =>{
    let totalVolume = 0;
    for (let i = 0; i < orderFlow.length; i++) {
      totalVolume = totalVolume + orderFlow[i].quantity ;
    }
    return totalVolume
  }

  const calculateUserShare = async (totalVolume, orderFlow) => {
    let userShares = [];
    // should be blackboxed into ok.sumBy(array, key)
    const res = Array.from(
      orderFlow.reduce((map, {user_id, quantity}) => {
        if(map.has(user_id)) {
            map.set(user_id, map.get(user_id) + quantity);
        } else {
            map.set(user_id, quantity);
        }
        return map;
      }, new Map()), 
      ([user_id, quantity]) => ({user_id, quantity})
    );

    for (let i = 0; i < res.length; i++) {
      userShares.push({
        'user_id': res[i].user_id,
        'quantity': res[i].quantity,
        'share': res[i].quantity/totalVolume
      })
    }
    return userShares
  }
  const summarizeDividends = async () => {
    let total = 0;
    const { data, error } = await supabase
      .from('dividends')
      .update({ status: '1' })
      .eq('status', 0)
      .eq('currency', currency)
      .select()
    for (let i = 0; i < data.length; i++) {
      total += data[i].amount;
    }
    return total
  }
  const orderFlow = await getFilteredOrderFlow();
  const totalVolume = await getTotalVolume(orderFlow)
  const userShare = await calculateUserShare(totalVolume, orderFlow)
  const dividendSum = await summarizeDividends();
  
  if (!dividendSum) return 'no dividends'
  let result = []
  for (let i = 0; i < userShare.length; i++) {
    const currentUser = userShare[i]
    const user = currentUser.user_id
    const share = currentUser.share
    const dividend = dividendSum * share
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: user,
        amount: dividend,
        currency: currency,
        transaction_type: 2,
        transaction_status: 1
      })
      .select()
      .single()
    result.push({
      'user_id': user,
      'share': share,
      'paid_out': dividend,
      'currency': currency,
      'transaction_type': 3,
      'transaction': data.transaction_id
    })
  }
  return result
});