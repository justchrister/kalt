import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('userId')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  const getDays = async (user) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select('userId, quantityChange, date, ticker')
      .eq('userId', user)
      .order('date', { ascending: true })
    if (error){
      return error
    } else {
      return data
    }
  };
  const addValueToday = async (days) => {
    let quantityToday = 0;
    if(days.length === 0) return
    for (let i = 0; i < days.length; i++) {
      const current = days[i];
      quantityToday += current.quantityChange
      const { data, error } = await supabase
        .from('getUserPortfolio')
        .update(
          { 
            'quantityToday': quantityToday 
          }
        )
        .eq('userId', current.userId)
        .eq('date', current.date)
        .eq('ticker', current.ticker)
        .select();
        if (data) ok.log('success', 'updated date', data)
        if (error) ok.log('error', 'updated date', error)
    }
  }
  if(body){
    const days = await getDays(body.record.userId);
    await addValueToday(days);
  }
  if(!body){
    const users = await getUsers();
    for (let i = 0; i < users.length; i++) {
      const days = await getDays(users[i].userId);
      await addValueToday(days);
    }
  }
  return 'processed'
});