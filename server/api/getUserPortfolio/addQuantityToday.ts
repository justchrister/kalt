import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const getDays = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('user_id, quantity_change, date, ticker')
      .eq('user_id', user)
      .order('date', { ascending: true })
    if (data) return data
  };
  let quantity_today = 0;
  const days = await getDays(body.record.user_id);
  for (let i = 0; i < days.length; i++) {
    const current = days[i];
    quantity_today += current.quantity_change
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .update({
        "quantity_today": quantity_today
      })
      .eq('user_id', current.user_id)
      .eq('date', current.date)
      .eq('ticker', current.ticker)
      .select();
      if (data) ok.log('success', 'updated date', data)
      if (error) ok.log('error', 'updated date', error)
  }
  return 'processed'
});