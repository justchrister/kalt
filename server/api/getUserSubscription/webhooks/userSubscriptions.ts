import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getUserSubscription';
  const serviceKebab = ok.camelToKebab(service);
  const topic = 'userSubscriptions';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity
  );

  await messaging.read(supabase, topic, service, body.record.message_id);

  const cleanMessage = await messaging.cleanMessage(message);
  
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(cleanMessage)
    .select();
  
  if(data) return data;
  if(error) return error;
});