import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'getUserPortfolio';
  const topic = 'userPreferences';
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const { data, error } = await supabase
    .from(service)
    .update({ 
      'valueCurrency': message.currency 
    })
    .eq('userId', message.userId)
    .select();

  return { data, error };
});