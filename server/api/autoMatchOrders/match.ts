import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'autoMatchOrders'
  const body = await readBody(event)
  
  const originalOrder = body.record
  const ticker = originalOrder.ticker
  const quantityInverted = ok.invertInt(originalOrder.quantity)

  let orderTypeInverted='buy'
  if(originalOrder.orderType==='buy'){
    orderTypeInverted='sell'
  }

  const getFulfiller = async () => {
    const { data, } = await supabase
      .from(service)
      .select()
      .gte('quantityAbsolute', originalOrder.quantityAbsolute)
      .eq('orderType', orderTypeInverted)
      .eq('ticker', ticker)
      .limit(1)
      .single()
    if(data){
      return data
    } else {
      return null
    }
  }
  
  const fulfillingOrder = await getFulfiller()
  if (!fulfillingOrder) return 'no fulfilling order available'

  if(fulfillingOrder.quantityAbsolute===originalOrder.quantityAbsolute){
    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: originalOrder.entity
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: fulfillingOrder.entity
    });

    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: fulfillingOrder.entity
    }).exchangeOrders({
      userId: fulfillingOrder.userId,
      status: 'fulfilled',
      fulfilledBy: originalOrder.entity
    });

  } else if (fulfillingOrder.quantityAbsolute >=  originalOrder.quantityAbsolute) {
    const newOrderId1 = ok.uuid();
    const newOrderId2 = ok.uuid();

    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: originalOrder.entity
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: newOrderId1
    });

    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: fulfillingOrder.entity
    }).exchangeOrders({
      userId: fulfillingOrder.userId,
      status: 'split',
      splitInto: [
        newOrderId1,
        newOrderId2
      ]
    });

    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: newOrderId1
    }).exchangeOrders({
      status: 'fulfilled',
      partOf: fulfillingOrder.entity,
      userId: fulfillingOrder.userId,
      quantity: quantityInverted,
      type: fulfillingOrder.orderType,
      fulfilledBy: originalOrder.entity
    });

    await pub(supabase, {
      sender:'server/api/autoMatchOrders/match.ts',
      entity: newOrderId2
    }).exchangeOrders({
      status: 'open',
      partOf: fulfillingOrder.entity,
      userId: fulfillingOrder.userId,
      quantity: fulfillingOrder.quantity+originalOrder.quantity,
      type: fulfillingOrder.orderType
    });
  }
  return 'Orders processed';
});