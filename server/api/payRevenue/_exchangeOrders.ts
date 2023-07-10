import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  const topic = 'exchangeOrders';
  const service = 'getUserPortfolio';
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';
  
  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);

  const readMessage = await messaging.read(supabase, topic, service, body.record.message_id);
  if (message.order_status !== 'fulfilled') return 'order not fulfilled';
  
  const getPortfolio = async () => {
    const { data, error } = await supabase
      .from('exchange_orders')
      .select()
      .eq('user_id', message.user_id)
      .eq('order_status', 'fulfilled')
    ok.log('success', 'did it!:', data)
    return data
  }
  const sumShares = async (portfolio) => {
    let totalShares = 0;
    for (let i = 0; i < portfolio.length; i++) {
      const order = portfolio[i];
      totalShares += order.quantity;
    };
    return totalShares
  }

  const updateShares = async (shares) => {
    const { data, error } = await supabase
      .from('pay_revenue')
      .insert({
        user_id: message.user_id,
        quantity: shares,
      })
      .select()
    ok.log('success', 'did it!:', data)
    return data
  }
  const portfolio = await getPortfolio();
  const totalShares = await sumShares(portfolio);
  const updatedShares = await updateShares(totalShares);
  
  ok.log('success', 'did it!:', updatedShares)
  return updatedShares;
});