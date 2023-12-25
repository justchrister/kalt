import { ok } from '~/composables/ok'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const gracePeriod = 1;
  const retries = 3;
  
  const { data, error} = await supabase
    .from('topic_autoInvest')
    .select()
    .order('message_sent', { ascending: true });

  if(error) return;
  
  const merged = ok.merge(data, 'userId') as autoInvest[];

  const active = merged.filter((entry: autoInvest) => entry.active)

  const now = new Date();
  const gracePeriodHoursAgo = new Date(now.getTime() - gracePeriod*60*60*1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24*60*60*1000);
  const oneWeekAgo = new Date(now.getTime() - 7*24*60*60*1000);
  const beginningOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const middleOfMonth = new Date(now.getFullYear(), now.getMonth(), 15);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);

  const notAdjustedRecently = active.filter((entry: autoInvest) => new Date(entry.message_sent as string) < gracePeriodHoursAgo)

  const createTransaction = async (autoInvestEntity: string) => {
    let attempts = retries;

    for (let i = 0; i < attempts; i++) {
      const errorTransaction = await pub(supabase, {
        sender:'server/api/invest/auto.ts'
      }).accountTransactions({
        type: 'autoInvest',
        amount: 0,
        currency: 'USD',
        status: 'pending'
      } as accountTransaction );
      if(!errorTransaction) break;
      if(i===attempts-1) return;
    }

    for (let i = 0; i < attempts; i++) {
      const errorAutoInvest = await pub(supabase, {
        sender:'server/api/invest/auto.ts',
        entity: autoInvestEntity
      }).autoInvest({
        charged: ok.timestamptz()
      } as autoInvest );
      await ok.sleep(1000)
      if(!errorAutoInvest) break;
    }
  }

  for (const entry of notAdjustedRecently) {
    const lastCharged = new Date(entry.charged as string);
    if(entry.interval==='daily' && lastCharged < twentyFourHoursAgo) {
      await createTransaction(entry.message_entity as string)
    }
    if(entry.interval==='weekly' && lastCharged < oneWeekAgo) {
      await createTransaction(entry.message_entity as string)
    }
    if(entry.interval?.startsWith('monthly')){
      if(entry.interval.endsWith('Beginning') && lastCharged < beginningOfMonth) {
        await createTransaction(entry.message_entity as string)
      }
      if(entry.interval.endsWith('monthlyMiddle') && lastCharged < middleOfMonth) {
        await createTransaction(entry.message_entity as string)
      }
      if(entry.interval.endsWith('monthlyEnd') && lastCharged < endOfMonth) {
        await createTransaction(entry.message_entity as string)
      }
    }
  }

  return {
    'tried charging: ': notAdjustedRecently
  }
});