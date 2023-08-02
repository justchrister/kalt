import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCardDefault';
  const serviceKebab = ok.camelToKebab(service);
  const topic = 'paymentCards';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  
  
  if (!message.default) return 'not default';
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert({
      'userId': message.userId,
      'last_four_digits': message.last_four_digits,
      'card_number': message.card_number,
      'expiry_month': message.expiry_month,
      'expiry_year': message.expiry_year,
      'cvc': message.cvc
    })
    .select();
  
  if(data) return data;
  if(error) return error;
});