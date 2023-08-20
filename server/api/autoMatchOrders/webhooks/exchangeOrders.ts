import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoMatchOrders';
  const topic = 'exchangeOrders';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  
  
  if (message.status !== 'open') {
    const { error } = await supabase
      .from(service)
      .delete()
      .eq('message_entity', message.message_entity);
    return 'removed';
  }

  let json = {
    'entity': message.message_entity,
    'userId': message.userId,
    'ticker': message.ticker,
    'orderType': message.type,
    'quantity': message.quantity,
    'quantityAbsolute': Math.abs(message.quantity)
  };

  const { data, error } = await supabase
    .from(service)
    .upsert(json)
    .select();

  if (data) return data;
  if (error) return error;
});