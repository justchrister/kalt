import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'payments';
  const topic = 'accountTransactions';
  const serviceKebab = ok.camelToKebab(service);
  const topicKebab = ok.camelToKebab(topic);
  const query = getQuery(event);
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);
  await messaging.read( supabase, topic, service, body.record.message_id)

  if(message.transaction_type != 'deposit'){
    ok.log('error', 'wrong transaction type')
    return 'wrong transaction type'
  } 
  if(message.transaction_sub_type != 'card' || message.transaction_sub_type != 'subscription') {
    ok.log('error', 'wrong transaction sub type')
    return 'wrong transaction sub type'
  }
  if(message.transaction_status != 'payment_awaiting') {
    ok.log('error', 'wrong transaction status')
    return 'wrong transaction status'
  }
  
  const deletePayment = async () => {
    const { error } = await supabase
      .from('payments_pending')
      .delete()
      .eq('message_id', message.transaction_id)
    if(error) return false
    else return true;
  }
  const updateTransaction = async () => {
    let json = message;
    json.transaction_status = 'payment_processing';
    json.message_id = ok.uuid();
    json.message_sender = 'server/api/payments/_accountTransactions.ts';
    const { data, error } = await supabase
      .from('account_transactions')
      .insert(json)
      .select()
    return data
  }
  const paymentExists = async (id) => {
    const { data, error } = await supabase
      .from('payments')
      .select()
      .eq('transaction_id', id)
      .limit(1)
      .single()
    if(error) {
      ok.log('success', 'could not find payment in table')
      return false
    }
    if(data){
      ok.log('success', 'found payment in table ', data)
      return true
    }
  }
  const existingPayment = await paymentExists(message.message_entity_id);
  if(existingPayment) return 'payment already exists'

  if(message.transaction_status='payment_awaiting'){
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: message.user_id,
        amount: message.amount,
        currency: message.currency,
        transaction_id: message.message_entity_id
      })
      .select()
    if(error) return error;
    if(data) {
      await updateTransaction();
      return data
    };
  }
  
  if(message.transaction_status='payment_declined' || 'payment_approved' ) {
    const deletedPayment = await deletePayment(message.message_entity_id);
    if(deletedPayment===true) {
      ok.log('success', 'payment'+message.message_entity_id+' deleted')
      return 'payment'+message.message_entity_id+' deleted'
    }
    if(deletedPayment===false) {
      ok.log('error', 'payment'+message.message_entity_id+' not deleted')
      return 'payment'+message.message_entity_id+' did not exist, it might have been deleted previously'
    }
  }
  return 'ggg'
});