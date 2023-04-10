import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getAccountTransactions';
  const topic = 'accountTransactions';
  const serviceKebab = ok.camelToKebab(service);
  const topicKebab = ok.camelToKebab(topic);
  const query = getQuery(event);
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity_id)

  await messaging.read( supabase, topic, service, body.record.message_id)

  const getDistinctTransactions = async () => {
    const { data, error } = await supabase
      .from('account_transactions')
      .select('message_entity_id')
      .eq('user_id', message.user_id);

    const distinctMessageEntityIds = [...new Set(data.map(transaction => transaction.message_entity_id))];
    return distinctMessageEntityIds
  }
  const transactions = await getDistinctTransactions();
  const inserted = []
  for (let i = 0; i < transactions.length; i++) {
    const transaction = await messaging.getEntity(
      supabase,
      topic,
      transactions[i])
    console.log(transaction)
    const { data, error} = await supabase
      .from(serviceKebab)
      .upsert({
        "user_id": transaction.user_id,
        "amount": transaction.amount,
        "currency": transaction.currency,
        "date": transaction.message_created,
        "type": transaction.transaction_type,
        "sub_type": transaction.transaction_sub_type
      })
      .select()
      .limit(1)
      .single()
    if(error) ok.log('error', 'could not insert', error)
    inserted.push(data)
  }
  return inserted
});