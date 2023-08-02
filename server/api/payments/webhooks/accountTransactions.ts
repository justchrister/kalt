import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messagingNext';
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

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  if(message.type != 'deposit'){
    ok.log('error', 'wrong transaction type')
    return 'wrong transaction type'
  } 
  if (message.subType != 'card' && message.subType != 'subscription') {
    ok.log('error', 'wrong transaction sub type')
    return 'wrong transaction sub type'
  }
  if(message.status != 'pending') {
    ok.log('error', 'wrong transaction status')
    return 'wrong transaction status'
  }
  
  const deletePayment = async () => {
    const { error } = await supabase
      .from('paymentsPending')
      .delete()
      .eq('message_id', message.transaction_id)
    if(error) return false
    else return true;
  }
  const updateTransaction = async () => {
    let json = message;
    json.status = 'processing';
    json.message_id = ok.uuid();
    json.message_sender = 'server/api/payments/webhooks/accountTransactions.ts';
    const { data, error } = await supabase
      .from('topic_accountTransactions')
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
  const existingPayment = await paymentExists(message.message_entity);
  if(existingPayment) return 'payment already exists'

  if(message.status='pending'){
    const { data, error } = await supabase
      .from('payments')
      .insert({
        userId: message.userId,
        amount: message.amount,
        currency: message.currency,
        transaction_id: message.message_entity
      })
      .select()
    if(error) return error;
    if(data) {
      await updateTransaction();
      return data
    };
  }
  
  if(message.status='failed' || 'complete' ) {
    const deletedPayment = await deletePayment(message.message_entity);
    if(deletedPayment===true) {
      ok.log('success', 'payment'+message.message_entity+' deleted')
      return 'payment'+message.message_entity+' deleted'
    }
    if(deletedPayment===false) {
      ok.log('error', 'payment'+message.message_entity+' not deleted')
      return 'payment'+message.message_entity+' did not exist, it might have been deleted previously'
    }
  }
  return 'ggg'
});