import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'chargeSubscriptions';
  const serviceKebab = ok.camelToKebab(service);
  const topic = 'userSubscriptions';
  const body = await readBody(event);
  
  const processingId = ok.uuid();
  const today = {
    "full": ok.today(),
    "day": ok.today().dd(),
    "month": ok.today().mm(),
    "year": ok.today().yyyy(),
    "yearShort": ok.today().yy()
  }

  const endOfMonth = ok.lastDateOfMonth();
  const checkIfInProcessing = async () => {
    const { data, error } = await supabase
      .from('payments_subscriptions_processing')
      .select()
      .limit(1)
      .single()

    if(data) {
      if(data.processing_id == processingId) {
        ok.log('', 'being processed by this instance')
        return 'me'
      } else {
        ok.log('', 'being processed by another instance')
        return 'someone else'
      }
    }
    if(error){
      ok.log('', 'not being processed by anyone')
      return 'no one'
    } 
  }

  const setAsProcessing = async () => {
    const { data, error } = await supabase
      .from('payments_subscriptions_processing')
      .insert({
        processing_id: processingId,
      })
      .select()
  }

  const removeAsProcessing = async () => {
    const { data, error } = await supabase
      .from('payments_subscriptions_processing')
      .delete()
      .eq('processing_id', processingId)
      .select()
    if(data){
      ok.log('', 'removed as processing') 
    }
    if(error){
      ok.log('error', 'could not remove as processing') 
    }
  }

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select()
    if(data) ok.log('success', 'got all users')
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  const getTransactions = async (userId) => {
    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999)).toISOString();
 
  
    const { data, error } = await supabase
      .from('account_transactions')
      .select()
      .eq('user_id', userId)
      .eq('transaction_type', 'deposit')
      .eq('transaction_sub_type', 'subscription')
      .gte('message_created', startOfDay)
      .lte('message_created', endOfDay)
      .limit(1)
      .single()
  
    if(data) {
      ok.log('', 'found transaction, already charged')
      return 'already charged'
    }
    if(error) {
      ok.log('', 'could not find transaction, not charged')
      return 'not charged'
    }
  }

  const createTransaction = async (userId, amount, currency) => {
    const { data, error } = await supabase
      .from('account_transactions')
      .insert({
        message_id: ok.uuid(),
        message_entity_id: ok.uuid(),
        message_sender: 'server/api/payments/initiateSubscriptionPayments.ts',
        user_id: userId,
        transaction_status: 'payment_awaiting',
        transaction_type: 'deposit',
        transaction_sub_type: 'subscription',
        amount: amount,
        currency: currency
      })
      .select()
    if(data){
      ok.log('success', 'created transaction'+data.transaction_id)
    }
    if(error){
      ok.log('error', 'could not create transaction', error)
    }
  }
  const getChargableDays = async () => {
    let days = [ok.toInt(today.day)];
    if(today.day == endOfMonth.day) {
      const startDay = ok.toInt(today.day);
      for (let i = startDay + 1; i <= 31; i++) {
        days.push(i);
      }
    }
    return days;
  }
  let inProcessing;
  inProcessing = await checkIfInProcessing();
  
  if(inProcessing == 'someone else') {
    return 'already processing'
  }
  if(inProcessing == 'no one') {
    await setAsProcessing();
  }

  const users = await getUsers();

  let subscriptions = [];
  for (let i = 0; i < users.length; i++) {
    let subscription = null
    subscription = await messaging.getEntity(supabase, topic, users[i].user_id);
    const transaction = await getTransactions(users[i].user_id);
    if(transaction=='not charged') {
      subscriptions.push(subscription)
    }
    if(transaction=='already charged') {
      ok.log('', 'already charged for today')
    }
  }
  const chargeableDays = await getChargableDays();  
  console.log(chargeableDays) // it logs [ '16' ]
  let charges = [];
  for (let i = 0; i < subscriptions.length; i++) {
    if(subscriptions[i].active == true) {
      const user = users.find(u => u.user_id === subscriptions[i].user_id);
      const userCurrency = user ? user.currency : null;
      for (let j = 0; j < subscriptions[i].days_of_month.length; j++) {
        if(chargeableDays.includes(subscriptions[i].days_of_month[j])) {
          ok.log('success', 'chargeable day for', subscriptions[i]);
          charges.push({
            user_id: subscriptions[i].user_id,
            day: subscriptions[i].days_of_month[j],
            amount: subscriptions[i].amount,
            currency: userCurrency,
          });
        }
      }
    }
  }

  inProcessing = await checkIfInProcessing();
  if(inProcessing == 'me') {
    for (let i = 0; i < charges.length; i++) {
      await createTransaction(charges[i].user_id, charges[i].amount, charges[i].currency);
    }
    await removeAsProcessing();
    return charges
  } else {
    return 'already processing'
  }
  
});