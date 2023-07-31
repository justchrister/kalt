import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('userId')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  const getDays = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('userId, quantity_change, date, ticker')
      .eq('userId', user)
      .order('date', { ascending: true })
    if (data) return data
  };
  const addValueToday = async (days) => {
    let quantity_today = 0;
    for (let i = 0; i < days.length; i++) {
      const current = days[i];
      quantity_today += current.quantity_change
      const { data, error } = await supabase
        .from('get_user_portfolio')
        .update({ "quantity_today": quantity_today })
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