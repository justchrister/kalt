import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'chargeSubscriptions';
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
      .from('payments_subscriptionsProcessing')
      .select()
      .limit(1)
      .single()

    if(data) {
      if(data.processingId == processingId) {
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
      .from('payments_subscriptionsProcessing')
      .insert({
        processingId: processingId,
      })
      .select()
  }

  const removeAsProcessing = async () => {
    const { data, error } = await supabase
      .from('payments_subscriptionsProcessing')
      .delete()
      .eq('processingId', processingId)
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
      .from('getUser')
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
      .from('topic_accountTransactions')
      .select()
      .eq('userId', userId)
      .eq('type', 'deposit')
      .eq('subType', 'subscription')
      .gte('message_sent', startOfDay)
      .lte('message_sent', endOfDay)
      .limit(1)
      .single()
  
    if(error) {
      ok.log('', 'could not find transaction, not charged yet')
      return 'not charged'
    } else {
      ok.log('', 'found transaction, already charged')
      return 'already charged'
    }
  }

  const createTransaction = async (userId, amount, currency) => {
    const { data, error } = await supabase
      .from('topic_accountTransactions')
      .insert({
        message_sender: 'server/api/payments/initiateSubscriptionPayments.ts',
        userId: userId,
        status: 'pending',
        type: 'deposit',
        subType: 'subscription',
        amount: amount,
        currency: currency,
        autoVest: 1
      })
      .select()
    if(error){
      ok.log('error', 'could not create transaction', error)
    } else {
      ok.log('success', 'created transaction', data)
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
    const subscription = await sub(supabase, topic).entity(users[i].userId);
    const transaction = await getTransactions(users[i].userId);
    if(transaction=='not charged') {
      subscriptions.push(subscription)
    }
    if(transaction=='already charged') {
      ok.log('', 'already charged for today')
    }
  }
  const chargeableDays = await getChargableDays();  
  ok.log('', 'subscriptions: ', subscriptions);
  ok.log('', 'days to be charged: ', chargeableDays);
  let charges = [];
  for (let i = 0; i < subscriptions.length; i++) {
    if(subscriptions[i].active == true) {
      const user = users.find(u => u.userId === subscriptions[i].userId);
      const userCurrency = user ? user.currency : null;
      for (let j = 0; j < subscriptions[i].days.length; j++) {
        if(chargeableDays.includes(subscriptions[i].days[j])) {
          ok.log('success', 'chargeable day for', subscriptions[i]);
          charges.push({
            userId: subscriptions[i].userId,
            day: subscriptions[i].days[j],
            amount: subscriptions[i].amount,
            currency: userCurrency,
          });
        }
      }
    }
  }
  ok.log('', 'to be charged: ', charges)
  inProcessing = await checkIfInProcessing();
  if(inProcessing == 'me') {
    for (let i = 0; i < charges.length; i++) {
      await createTransaction(charges[i].userId, charges[i].amount, charges[i].currency);
    }
    await removeAsProcessing();
    return charges
  } else {
    return 'not being processed by me'
  }
  
});