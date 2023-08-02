import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  const topic = 'exchangeOrders';
  const service = 'getUserPortfolio';
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const date = new Date(message.message_sent);
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
    .eq('status', 'fulfilled')
    .eq('ticker', message.ticker)
    .gte('message_sent', dateFromISOString)
    .lt('message_sent', dateToISOString)
  
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
    .from('getUserPortfolio')
    .upsert(json)
    .eq('userId', message.userId)
    .eq('date', date)
    .eq('ticker', message.ticker);
  
  if(data) return data;
  if(error) return error;
});