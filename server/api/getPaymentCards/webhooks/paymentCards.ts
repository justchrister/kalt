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
  const insertCard = async () => {
    const { data, error } = await supabase
      .from(service)
      .upsert({
        'userId': message.userId,
        'cardId': message.message_entity,
        'lastFourDigits': message.lastFourDigits,
        'number': message.number,
        'month': message.month,
        'year': message.year,
        'default': message.default,
        'cvc': message.cvc    
      })
      .select();
    return true
    
  }
  const setDefault = async () => {
    const { data, error } = await supabase
      .from(service)
      .update({ default: false })
      .eq('userId', message.userId)
      .neq('cardId', message.cardId)
  }
  const data = await insertCard();
  if(message.default) await setDefault();
  return true
});