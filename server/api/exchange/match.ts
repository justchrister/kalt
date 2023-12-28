import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  
  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event)
  const service = 'match';
  const topic = 'exchange';
  const body = await readBody(event)
  const me = ok.uuid();
  if (body.record.read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.id);
  await sub(supabase, topic).read(service, body.record.event);  
 
  if (message.status !== 'open') {
    return 'not open for processing';
  }

  const toggleAsProcessing = async (order: string, me: string, on: boolean) => {
    const error = await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: order
    }).exchangeOrders({
      status: on ? 'processing' : 'open',
      processingBy: on ? me : null
    } as any );
    if(error) {
      return false
    } else {
      return true
    }
  }
  const isSetAsProcessing = await toggleAsProcessing(message.id, me, true) as boolean;
  if(!isSetAsProcessing) return 'error';

  const originalOrder = {
    quantityInverted: ok.invertInt(message.quantity),
    quantityAbsolute: Math.abs(message.quantity),
    typeInverted: message.type === 'buy' ? 'sell' : 'buy',
    ...message
  } as any ;
  
  const fulfillingOrder = await get(supabase).openExchangeOrder(originalOrder.ticker, originalOrder.typeInverted, originalOrder.quantityAbsolute) as any;
  if (!fulfillingOrder) return 'no fulfilling order available'

  const fulfillingOrderisSetAsProcessing = await toggleAsProcessing(fulfillingOrder.id, me, true);
  if(!fulfillingOrderisSetAsProcessing) return 'error';
  
  await ok.sleep(500);

  const amIProcessing = async (order: string, me:string) => {
    const exchangeOrder = await get(supabase).processingExchangeOrder(order);
    ok.log('', exchangeOrder)
    if(exchangeOrder==='error'){
      return false
    } 
    if(exchangeOrder.processingBy===me) {
      return true
    } else {
      return false
    }
  }
  ok.log('', 'originalORder: ', originalOrder)
  ok.log('', 'fulfillingOrder:', fulfillingOrder)
  // check if both orders are processing
  const amIProcessingOriginalOrder = await amIProcessing(originalOrder.id, me);
  const amIProcessingFulfillingOrder = await amIProcessing(fulfillingOrder.id, me);
  if(!amIProcessingOriginalOrder || !amIProcessingFulfillingOrder ) {
    if(amIProcessingOriginalOrder) {
      await toggleAsProcessing(originalOrder.id, me, false);
    }
    if(amIProcessingFulfillingOrder) {
      await toggleAsProcessing(fulfillingOrder.id, me, false);
    }
    return 'one of the orders are already being processed'
  }
  if(fulfillingOrder.quantityAbsolute===originalOrder.quantityAbsolute){
    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: originalOrder.id
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: fulfillingOrder.id
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: fulfillingOrder.id
    }).exchangeOrders({
      userId: fulfillingOrder.userId,
      status: 'fulfilled',
      fulfilledBy: originalOrder.id
    } as any );

  } else if (fulfillingOrder.quantityAbsolute >=  originalOrder.quantityAbsolute) {
    const newOrderId1 = ok.uuid();
    const newOrderId2 = ok.uuid();

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: originalOrder.id
    }).exchangeOrders({
      userId: originalOrder.userId,
      status: 'fulfilled',
      fulfilledBy: newOrderId1
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: fulfillingOrder.id
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
      partOf: fulfillingOrder.id,
      userId: fulfillingOrder.userId,
      quantity: originalOrder.quantityInverted,
      type: fulfillingOrder.orderType,
      fulfilledBy: originalOrder.id
    } as any );

    await pub(supabase, {
      sender:'server/api/match/match.ts',
      entity: newOrderId2
    }).exchangeOrders({
      status: 'open',
      partOf: fulfillingOrder.id,
      userId: fulfillingOrder.userId,
      ticker: fulfillingOrder.ticker,
      quantity: fulfillingOrder.quantity+originalOrder.quantity,
      type: fulfillingOrder.orderType
    } as any);
  }
  return 'Orders processed';
});