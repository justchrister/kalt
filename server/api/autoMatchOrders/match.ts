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
      .gte('quantity_absolute', originalOrder.quantity_absolute)
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

  if(fulfillingOrder.quantity_absolute===originalOrder.quantity_absolute){
    await publishMessage({
      'orderStatus': 'fulfilled',
      'userId': originalOrder.userId,
      'message_entity': originalOrder.message_entity,
      'ticker': ticker,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': fulfillingOrder.message_entity
    })
    await publishMessage({
      'orderStatus': 'fulfilled',
      'userId': fulfillingOrder.userId,
      'message_entity': fulfillingOrder.message_entity,
      'ticker': fulfillingOrder.ticker,
      'quantity': fulfillingOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'fulfilled_by_id': originalOrder.message_entity
    })
  }
  if (fulfillingOrder.quantity_absolute >=  originalOrder.quantity_absolute) {
    const newOrderId1 = ok.uuid();
    const newOrderId2 = ok.uuid();
    await publishMessage({
      'orderStatus': 'fulfilled',
      'userId': originalOrder.userId,
      'message_entity': originalOrder.message_entity,
      'ticker': ticker,
      'order_type': originalOrder.order_type,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': newOrderId1
    })
    await publishMessage({
      'orderStatus': 'split',
      'userId': fulfillingOrder.userId,
      'message_entity': fulfillingOrder.message_entity,
      'ticker': ticker,
      'quantity': fulfillingOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'split_into': [
        newOrderId1,
        newOrderId2
      ]
    })
    await publishMessage({
      'orderStatus': 'fulfilled',
      'userId': fulfillingOrder.userId,
      'message_entity': newOrderId1,
      'ticker': fulfillingOrder.ticker,
      'quantity': quantityInverted,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'fulfilled_by_id': originalOrder.message_entity
    })
    
    await publishMessage({
      'orderStatus': 'open',
      'userId': fulfillingOrder.userId,
      'message_entity': newOrderId2,
      'ticker': fulfillingOrder.ticker,
      'quantity': fulfillingOrder.quantity+originalOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service
    })
  }
  return 'Orders processed';
});