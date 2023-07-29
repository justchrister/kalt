import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getAccountBalance';
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

  const getPreferredCurrency = async () => {
    const {data, error} = await supabase
      .from('get_user')
      .select('user_id, currency')
      .eq('user_id', message.user_id)
      .limit(1)
      .single()
    return data.currency
  }
  const preferredCurrency = await getPreferredCurrency();
  
  let json = {
    "user_id": message.user_id,
    "amount": null,
    "currency": preferredCurrency
  }

  const getTransactions = async () => {
      const { data, error } = await supabase
      .from(topicKebab)
      .select()
      .or('transaction_status.eq.payment_accepted,transaction_status.eq.withdrawal_accepted')
      .eq('user_id', message.user_id);
    return data
  }
  const transactions = await getTransactions();

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const amountConverted = await messaging.convertCurrency(
      supabase,
      transaction.amount, 
      transaction.currency,
      preferredCurrency
    );
    json.amount += parseFloat(amountConverted);
  }

  const { data, error } = await supabase
    .from('get_account_balance')
    .upsert(json)
    .select()
  if(data) return data
  if(error) return error
});