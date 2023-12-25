import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'match';
  const topic = 'exchange';
  const body = await readBody(event)
  const me = ok.uuid();
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  if (message.status !== 'open') {
    return 'not open for processing';
  }

  const originalOrder = {
    quantityInverted: ok.invertInt(message.quantity),
    quantityAbsolute: Math.abs(message.quantity),
    orderTypeInverted: message.orderType === 'buy' ? 'sell' : 'buy',
    ...message
  } as any ;
  
  const fulfillingOrder = await get(supabase).openExchangeOrder(originalOrder.ticker, originalOrder.orderType, originalOrder.quantityAbsolute) as any;
  if (!fulfillingOrder) return 'no fulfilling order available'
  // set status to processing to prevent double processing
  // sleep for 500ms, then verify that its being processed by "me" uuid
  // if not, then return 'one of the orders are already being processed'
  // if yes, then continue

  const setAsProcessing = async (order: string, me: string) => {
    const error = await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: order
    }).exchangeOrders({
      status: 'processing',
      processedBy: me
    } as any );
    if(error) {
      return 'error'
    } else {
      return {
        status: 'processing',
        processedBy: me
      }
    }
  }
  const originalOrderIsProcessing = await setAsProcessing(originalOrder.entity, me);
  const fulfillingOrderIsProcessing = await setAsProcessing(fulfillingOrder.entity, me);
  if(originalOrderIsProcessing==='error' || fulfillingOrderIsProcessing==='error') {
    return 'error'
  }
  await ok.sleep(500);
  const amIProcessing = async (order: string, me:string) => {
    const exchangeOrder = await get(supabase).processingExchangeOrder(order);
    if(exchangeOrder==='error'){
      return false
    } 
    if(exchangeOrder.processedBy===me) {
      return true
    } else {
      return false
    }
  }
  // check if both orders are processing
  const amIProcessingOriginalOrder = await amIProcessing(originalOrder.entity, me);
  const amIProcessingFulfillingOrder = await amIProcessing(fulfillingOrder.entity, me);
  if(!amIProcessingOriginalOrder || !amIProcessingFulfillingOrder ) {
    if(amIProcessingOriginalOrder) {
      await pub(supabase, {
        sender:'server/api/match/match.ts',
        entity: originalOrder.entity
      }).exchangeOrders({
        status: 'open',
        processedBy: null
      } as any );
    }
    if(amIProcessingFulfillingOrder) {
      await pub(supabase, {
        sender:'server/api/match/match.ts',
        entity: fulfillingOrder.entity
      }).exchangeOrders({
        status: 'open',
        processedBy: null
      } as any );
    }
    return 'one of the orders are already being processed'
  }
  if(fulfillingOrder.quantityAbsolute===originalOrder.quantityAbsolute){
    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: originalOrder.entity
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: fulfillingOrder.entity
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: fulfillingOrder.entity
    }).exchangeOrders({
      userId: fulfillingOrder.userId,
      status: 'fulfilled',
      fulfilledBy: originalOrder.entity
    } as any );

  } else if (fulfillingOrder.quantityAbsolute >=  originalOrder.quantityAbsolute) {
    const newOrderId1 = ok.uuid();
    const newOrderId2 = ok.uuid();

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: originalOrder.entity
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: newOrderId1
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: fulfillingOrder.entity
    }).exchangeOrders({
      userId: fulfillingOrder.userId,
      status: 'split',
      splitInto: [
        newOrderId1,
        newOrderId2
      ]
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: newOrderId1
    }).exchangeOrders({
      status: 'fulfilled',
      partOf: fulfillingOrder.entity,
      userId: fulfillingOrder.userId,
      quantity: originalOrder.quantityInverted,
      type: fulfillingOrder.orderType,
      fulfilledBy: originalOrder.entity
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: newOrderId2
    }).exchangeOrders({
      status: 'open',
      partOf: fulfillingOrder.entity,
      userId: fulfillingOrder.userId,
      quantity: fulfillingOrder.quantity+originalOrder.quantity,
      type: fulfillingOrder.orderType
    } as any);
  }
  return 'Orders processed';
});