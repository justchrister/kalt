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
  const originalOrder = body.record
  const ticker = originalOrder.ticker
  const quantity = parseFloat(originalOrder.quantity)
  const quantityInverted = ok.invertInt(originalOrder.quantity)


  let orderTypeInverted='buy'
  if(originalOrder.order_type==='buy'){
    orderTypeInverted='sell'
  }

  const getFulfiller = async () => {
    const { data, error } = await supabase
      .from(serviceKebab)
      .select()
      .lte('quantity', quantityInverted)
      .eq('order_type', orderTypeInverted)
      .eq('ticker', ticker)
      .limit(1)
      .single()
    return data
  }

  const fulfillingOrder = await getFulfiller()
  if (!fulfillingOrder) return 'no fulfilling order available'

  const publishMessage = async (json) => {
    if (!json.quantity) return 'cant create an order without a quanitity here'

    const { data, error } = await supabase
      .from(topicKebab)
      .insert(json)
      .select()
    if(error) return error
    return data
  }

  if(fulfillingOrder.quantity + quantity === 0){
    await publishMessage({
      'order_status': 'fulfilled',
      'user_id': originalOrder.user_id,
      'message_entity_id': originalOrder.message_entity_id,
      'ticker': ticker,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': fulfillingOrder.message_entity_id
    })
    await publishMessage({
      'order_status': 'fulfilled',
      'user_id': fulfillingOrder.user_id,
      'message_entity_id': fulfillingOrder.message_entity_id,
      'ticker': fulfillingOrder.ticker,
      'quantity': fulfillingOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'fulfilled_by_id': originalOrder.message_entity_id
    })
  } else if (Math.abs(quantity) >= Math.abs(fulfillingOrder.quantity)) {
    const newOrderId1 = ok.uuid();
    const newOrderId2 = ok.uuid();
    await publishMessage({
      'order_status': 'fulfilled',
      'user_id': originalOrder.user_id,
      'message_entity_id': originalOrder.message_entity_id,
      'ticker': ticker,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': newOrderId1
    })
    await publishMessage({
      'order_status': 'split',
      'user_id': fulfillingOrder.user_id,
      'message_entity_id': fulfillingOrder.message_entity_id,
      'ticker': ticker,
      'quantity': fulfillingOrder.quantity,
      'order_type': originalOrder.order_type,
      'message_sender': service,
      'split_into': [
        newOrderId1,
        newOrderId2
      ]
    })
    await publishMessage({
      'order_status': 'fulfilled',
      'user_id': fulfillingOrder.user_id,
      'message_entity_id': fulfillingOrder.message_entity_id,
      'ticker': fulfillingOrder.ticker,
      'quantity': quantityInverted,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'fulfilled_by_id': originalOrder.message_entity_id
      // new order 1, will not be fulfilled
    })
    // this one will be fulfilled
    await publishMessage({
      'order_status': 'open',
      'user_id': fulfillingOrder.user_id,
      'message_entity_id': newOrderId1,
      'ticker': fulfillingOrder.ticker,
      'quantity': fulfillingOrder.quantity+originalOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service
      // new order 1, will not be fulfilled
    })
  }
  return 'Orders processed';
});