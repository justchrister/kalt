import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getLinkedBankAccounts';
  const topic = 'linkedBankAccounts';
  const serviceKebab = ok.camelToKebab(service);
  const topicKebab = ok.camelToKebab(topic);
  const query = getQuery(event);
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);
  await messaging.read( supabase, topic, service, body.record.message_id)
  const cleanedMessage = await messaging.cleanMessage(message)

  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(cleanedMessage)
    .select()
  return { data, error }
});