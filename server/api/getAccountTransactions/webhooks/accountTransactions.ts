import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getAccountTransactions';
  const topic = 'accountTransactions';
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  
  
  const getDistinctTransactions = async () => {
    const { data, error } = await supabase
      .from('topic_accountTransactions')
      .select('message_entity')
      .eq('userId', message.userId);
    if(error){
      ok.log('', 'no transactions found')
    } else {
      const distinctMessageEntityIds = [...new Set(data.map(transaction => transaction.message_entity))];
      return distinctMessageEntityIds
    }
  }
  const transactions = await getDistinctTransactions();
  let inserted = []
  for (let i = 0; i < transactions.length; i++) {
    const transaction = await sub(supabase, topic).entity(transactions[i])
    
    const { data, error} = await supabase
      .from(service)
      .upsert({
        userId: transaction.userId,
        amount: transaction.amount,
        currency: transaction.currency,
        date: transaction.message_sent,
        type: transaction.type,
        subType: transaction.subType
      })
      .eq('userId', transaction.userId)
      .select()
    if(error) {
      ok.log('error', 'could not insert', error)
    } else {
      ok.log('success', 'inserted', data)
      inserted.push(data)
    }
  }
  return inserted
});