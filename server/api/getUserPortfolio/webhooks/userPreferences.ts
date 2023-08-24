import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'
// this one should get the new currency and replace that in the value_currency column
export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const service = 'getUserPortfolio';
  const topic = 'userPreferences';
  const body = await readBody(event)
  if(body.record.message_read) return 'message already read'
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const { data, error } = await supabase
    .from('getUserPortfolio')
    .update({ 'valueCurrency': message.currency })
    .eq('userId', message.userId)
    .select();

  if(data) return data
  if(error) return error
});