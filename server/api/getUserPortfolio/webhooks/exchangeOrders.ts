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

  const date = new Date(message.message_created);
  const dateFrom = date;
  dateFrom.setHours(0, 0, 0, 0);
  
  const dateTo = new Date(dateFrom);
  dateTo.setDate(dateTo.getDate() + 1);

  const dateFromISOString = dateFrom.toISOString();
  const dateToISOString = dateTo.toISOString();
  
  const { data: dailyOrders, error: dailyOrdersError } = await supabase
    .from('topic_exchangeOrders')
    .select()
    .eq('userId', message.userId)
    .eq('orderStatus', 'fulfilled')
    .eq('ticker', message.ticker)
    .gte('message_created', dateFromISOString)
    .lt('message_created', dateToISOString)
  
  const json = {
    'userId': message.userId,
    'date': date,
    'ticker': message.ticker,
    'quantity_change': 0
  };

  for (let i = 0; i < dailyOrders.length; i++) {
    const order = dailyOrders[i];
    json.quantity_change += order.quantity;
  };

  const { data, error} = await supabase
    .from('get_user_portfolio')
    .upsert(json)
    .eq('userId', message.userId)
    .eq('date', date)
    .eq('ticker', message.ticker);
  
  if(data) return data;
  if(error) return error;
});