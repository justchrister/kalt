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
  if(message.status != 'fulfilled') return 'order not fulfilled';
  const date = new Date(message.message_sent);
  const dateFrom = date;
  dateFrom.setHours(0, 0, 0, 0);
  
  const dateTo = new Date(dateFrom);
  dateTo.setDate(dateTo.getDate() + 1);
  const dateFromISOString = dateFrom.toISOString();
  const dateToISOString = dateTo.toISOString();

  const getFulfilledOrders = async () => {
    const { data, error } = await supabase
      .from('topic_exchangeOrders')
      .select()
      .eq('status', 'fulfilled')
      .gte('message_sent', dateFromISOString)
      .lt('message_sent', dateToISOString)
    if(error){
      console.log(error);
      return error;
    } else {
      ok.log('',data)
      return data;
    }
  }
  const getFulfilledEntities = async (entries) => {
    let entities = [];
    for (let i = 0; i < entries.length; i++) {
      const entity = await sub(supabase, topic).entity(entries[i].message_entity);
      entities.push(entity);
    }
    return entities
  }
  const fulfilledOrders = await getFulfilledOrders();
  const fulfilledEntities = await getFulfilledEntities(fulfilledOrders);

  // get all distinct entities
  const json = {
    'userId': message.userId,
    'date': date,
    'ticker': message.ticker,
    'quantityChange': 0
  };

  for (let i = 0; i < fulfilledEntities.length; i++) {
    if(fulfilledEntities[i].ticker != message.ticker) continue;
    if(fulfilledEntities[i].userId != message.userId) continue;
    const order = fulfilledEntities[i];
    json.quantityChange += order.quantity;
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