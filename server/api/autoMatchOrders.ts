import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'exchangeOrders'
  const topicKebab = ok.camelToKebab(topic)
  const service = 'autoMatchOrders'
  const serviceKebab = ok.camelToKebab(service)
  const query = getQuery(event)
  const body = await readBody(event)
  const quantity = parseFloat(body.record.quantity)
  const invertedQuantity = ok.invertInt(quantity)
  const ticker = body.record.ticker

  let orderTypeInverted='buy'
  if(body.record.order_type==='buy'){
    orderTypeInverted='sell'
  }

  const getFulfiller = async () => {
    const { data, error } = await supabase
      .from(serviceKebab)
      .select()
      .lte('quantity', invertedQuantity)
      .eq('order_type', orderTypeInverted)
      .eq('ticker', ticker)
      .limit(1)
      .single()
    return data
  }
  // should have a processing bool that will be updated when its in processing
  // we also need to remove irrelevant orders from the match orders table.. 

  const fulfiller = await getFulfiller()

  const publishOrder = async (json) => {
    const { data, error } = await supabase
      .from(topicKebab)
      .insert(json)
      .select()
    if(error) return error
    return data
  }
  let orders=[
      {
        'user_id': body.record.user_id,
        'message_entity_id': body.record.message_entity_id,
        'ticker': ticker,
        'quantity': body.record.quantity,
        'message_sender': service,
        'order_status': 'fulfilled',
        'fulfilled_by_id': fulfiller.message_entity_id
      },
      {
        'user_id': fulfiller.user_id,
        'message_entity_id': fulfiller.message_entity_id,
        'ticker': ticker,
        'quantity': invertedQuantity,
        'order_type': orderTypeInverted,
        'message_sender': service,
        'order_status': 'fulfilled',
        'fulfilled_by_id': body.record.message_entity_id
      }
    ];
  const fulfillerQuantityInt = parseFloat(fulfiller.quantity)
  const orderFulfilledId = ok.uuid();
  const orderCancelledId = ok.uuid();
  const orderOpenId = ok.uuid();
  
  const orderOriginal = orders[0];
  const orderFulfilled = orders[1]; // might be split
  // need to create two functions; splitOrder(), and fulfillOrder()
  // or similar
  if(fulfiller.quantity + quantity !== 0){
    orderOriginal.fulfilled_by_id=orderFulfilledId
    orderFulfilled.message_entity_id=orderFulfilledId
    orderFulfilled.part_of=fulfiller.message_entity_id

    let splitAndOpenOrder = {
      'user_id': fulfiller.user_id,
      'message_entity_id': orderOpenId,
      'ticker': ticker,
      'quantity': fulfillerQuantityInt+quantity, // add cause the other one is negative
      'order_type': orderTypeInverted,
      'message_sender': service,
      'order_status': 'open',
      'part_of': fulfiller.message_entity_id
    };
    orders.push(splitAndOpenOrder);

    let splitAndCancelOrder = {
      'user_id': fulfiller.user_id,
      'message_entity_id': fulfiller.message_entity_id,
      'message_sender': service,
      'ticker': ticker,
      'quantity': fulfillerQuantityInt,
      'split_into': [
        orderFulfilledId,
        orderOpenId
      ],
      'order_status': 'split'
    };
    orders.push(splitAndCancelOrder)
  };
  /*
  await messaging.publish('accountTransactions', {

  })*/
  // the sell order needs to have an account deposit added, with auto-invest 0
  return await publishOrder(orders);
});