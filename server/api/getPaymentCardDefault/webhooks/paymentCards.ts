import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCardDefault';
  const topic = 'paymentCards';
  const body = await readBody(event);
  
  if (body.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.message_entity);
  await sub(supabase, topic).read(service, body.message_id);  
  
  if (!message.default) return 'not default';
  const { data, error } = await supabase
    .from(service)
    .upsert({
      'userId': message.userId,
      'lastFourDigits': message.lastFourDigits,
      'number': message.number,
      'month': message.month,
      'year': message.year,
      'cvc': message.cvc
    })
    .select();
  
  if(data) return data;
  if(error) return error;
});