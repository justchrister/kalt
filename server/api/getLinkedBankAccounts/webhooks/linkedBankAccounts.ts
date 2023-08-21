import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getLinkedBankAccount';
  const topic = 'linkedBankAccounts';
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);
  
  const { data, error } = await supabase
    .from(service)
    .upsert({
      userId: message.userId,
      iban: message.iban,
      bankCode: message.bankCode,
      reference: message.reference
    })
    .select()
  return { data, error }
});