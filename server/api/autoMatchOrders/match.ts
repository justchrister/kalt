import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'exchangeOrders'
  const service = 'autoMatchOrders'
  const body = await readBody(event)
  
  const originalOrder = body.record.record
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

  const publishMessage = async (entity, json) => {
    if (!json.quantity) return 'cant create an order without a quanitity here'
    const { error, data } = await pub(supabase, {
      entity: entity,
      sender:'server/api/autoMatchOrders/match.ts'
    }).exchangeOrder(json);

    if(error) return error
    return data
  }

  if(fulfillingOrder.quantity_absolute===originalOrder.quantity_absolute){
    await publishMessage(originalOrder.message_entity, {
      'status': 'fulfilled',
      'userId': originalOrder.userId,
      'ticker': ticker,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': fulfillingOrder.message_entity
    })
    await publishMessage(fulfillingOrder.message_entity, {
      'status': 'fulfilled',
      'userId': fulfillingOrder.userId,
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
    await publishMessage(originalOrder.message_entity,{
      'status': 'fulfilled',
      'userId': originalOrder.userId,
      'ticker': ticker,
      'order_type': originalOrder.order_type,
      'quantity': originalOrder.quantity,
      'message_sender': service,
      'fulfilled_by_id': newOrderId1
    })
    await publishMessage(fulfillingOrder.message_entity, {
      'status': 'split',
      'userId': fulfillingOrder.userId,
      'ticker': ticker,
      'quantity': fulfillingOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'split_into': [
        newOrderId1,
        newOrderId2
      ]
    })
    await publishMessage(newOrderId1, {
      'status': 'fulfilled',
      'userId': fulfillingOrder.userId,
      'ticker': fulfillingOrder.ticker,
      'quantity': quantityInverted,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service,
      'fulfilled_by_id': originalOrder.message_entity
    })
    
    await publishMessage(newOrderId2, {
      'status': 'open',
      'userId': fulfillingOrder.userId,
      'ticker': fulfillingOrder.ticker,
      'quantity': fulfillingOrder.quantity+originalOrder.quantity,
      'order_type': fulfillingOrder.order_type,
      'message_sender': service
    })
  }
  return 'Orders processed';
});