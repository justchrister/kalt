import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getAccountBalance';
  const topic = 'userPreferences';
  const serviceKebab = ok.camelToKebab(service);
  const topicKebab = ok.camelToKebab(topic);
  const query = getQuery(event);
  const body = await readBody(event);
  if(body.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.message_entity);
  await sub(supabase, topic).read(service, body.message_id);  
  
  let json = {
    "userId": message.userId,
    "amount": null,
    "currency": message.currency
  }

  const getTransactions = async () => {
      const { data, error } = await supabase
      .from('topic_accountTransactions')
      .select()
      .or('status.eq.complete,status.eq.complete')
      .eq('userId', message.userId);
    return data
  }
  const transactions = await getTransactions();

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const amountConverted = await ok.convertCurrency(
      supabase,
      transaction.amount, 
      transaction.currency,
      message.currency
    );
    json.amount += parseFloat(amountConverted);
  }

  const { data, error } = await supabase
    .from('getAccountBalance')
    .upsert(json)
    .select()
  
  if(data) return data
  if(error) return error
});