import { ok } from '~/composables/ok'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const gracePeriod = 2;
  const mockAsTodayIs = {
    'dd': 1,
    'mm': 1,
    'yyyy': 2024
  }
  const shouldMock = false;

  const { data, error} = await supabase
    .from('topic_autoInvest')
    .select()
    .order('message_sent', { ascending: true });

  if(error) return;
  
  const merged = ok.merge(data, 'message_entity') as autoInvest[];

  const active = merged.filter((entry: autoInvest) => entry.active)

  const now = shouldMock ? new Date(mockAsTodayIs.yyyy, mockAsTodayIs.mm - 1, mockAsTodayIs.dd) : new Date();
  const gracePeriodHoursAgo = new Date(now.getTime() - gracePeriod*60*60*1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24*60*60*1000);
  const oneWeekAgo = new Date(now.getTime() - 7*24*60*60*1000);
  const beginningOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const middleOfMonth = new Date(now.getFullYear(), now.getMonth(), 15);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);

  const notAdjustedRecently = active.filter((entry: autoInvest) => new Date(entry.message_sent as string) < gracePeriodHoursAgo)

  const createTransaction = async (userId: string, amount: number, autoInvestEntity: string, currency: string) => {
      const errorTransaction = await pub(supabase, {
        sender:'server/api/invest/auto.ts'
      }).accountTransactions({
        userId,
        type: 'deposit',
        subType: 'card',
        amount,
        currency,
        status: 'pending',
        autoVest: 1
      } as accountTransaction );

      if(errorTransaction) {
        ok.log('error', errorTransaction)
        return;
      } else {
        ok.log('success', 'created transaction')
      }

      const errorAutoInvest = await pub(supabase, {
        sender:'server/api/invest/auto.ts',
        entity: autoInvestEntity
      }).autoInvest({
        userId: autoInvestEntity,
        lastCharged: ok.timestamptz()
      } as autoInvest );

      if(errorAutoInvest) {
        ok.log('error', 'could not update auto invest: ',error)
      } else {   
        ok.log('success', 'updated auto invest')
      }
  }
  const shouldCharge = (interval: string, lastCharged: Date) => {
    const today = now.getDate()

    switch (true) {
      case interval === 'daily' && lastCharged < twentyFourHoursAgo:
      case interval === 'weekly' && lastCharged < oneWeekAgo:
      case interval === 'monthlyBeginning' && today === beginningOfMonth.getDate() && lastCharged < beginningOfMonth:
      case interval === 'monthlyMiddle' && today === middleOfMonth.getDate() && lastCharged < middleOfMonth:
      case interval === 'monthlyEnd' && today === endOfMonth.getDate() && lastCharged < endOfMonth:
        return true
      default: 
        return false
    }
  }
  let charged = []
  for (const entry of notAdjustedRecently) {
    const user = await get(supabase).user(entry.userId);
    const userId = entry.userId as string;
    const currency = user?.currency as string || 'EUR';
    const entity = entry.message_entity as string;
    const interval = entry.interval as string;
    const amount = entry.amount as number;

    const lastChargedDate = new Date(entry.lastCharged as string);
    const lastCharged = isNaN(lastChargedDate.getTime()) ? new Date(Date.UTC(1999, 0, 1)) : lastChargedDate;
    
    if(shouldCharge(interval, lastCharged)){
      charged.push(entry)
      await createTransaction(userId, amount, entity, currency)
    }
  }

  return charged
});