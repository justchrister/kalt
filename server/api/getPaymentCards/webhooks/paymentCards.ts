import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCards';
  const topic = 'paymentCards';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);
  ok.log('', message)
  
  const { data, error } = await supabase
    .from(service)
    .upsert({
      'userId': message.userId,
      'lastFourDigits': message.lastFourDigits,
      'number': message.number,
      'cardId': message.cardId,
      'month': message.month,
      'year': message.year,
      'default': message.default,
      'cvc': message.cvc    
    })
    .select();
  
  if(data) return data;
  if(error) return error;
});