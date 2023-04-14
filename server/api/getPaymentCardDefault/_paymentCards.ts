import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCardDefault';
  const serviceKebab = ok.camelToKebab(service);
  const topic = 'paymentCards';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity_id
  );

  await messaging.read(supabase, topic, service, body.record.message_id);
  
  if (!message.default) return 'not default';
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert({
      'user_id': message.user_id,
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