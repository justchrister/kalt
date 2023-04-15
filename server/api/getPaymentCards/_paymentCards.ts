import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCards';
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
  const json = await messaging.cleanMessage({
    'user_id': message.user_id,
    'last_four_digits': message.last_four_digits,
    'card_number': message.card_number,
    'card_id': message.card_number,
    'expiry_month': message.expiry_month,
    'expiry_year': message.expiry_year,
    'default': message.default,
    'cvc': message.cvc
  });
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .select();
  
  if(data) return data;
  if(error) return error;
});