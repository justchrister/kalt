import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const service = 'getUserPortfolio';
  const topic = 'userPreferences';
  const ticker = 'gi.ddf';
  const body = await readBody(event)

  const getDays = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('user_id, quantity_change, date, ticker')
      .eq('user_id', user)
      .order('date', { ascending: true })
    if (data) return data
  };

  const json = []
  let quantity_today = 0;
  const days = await getDays(body.record.user_id);
  for (let i = 0; i < days.length; i++) {
    const current = days[i];
    quantity_today += current.quantity_change
    json.push({
      "user_id": current.user_id,
      "ticker": current.ticker,
      "date": current.date,
      "quantity_today": quantity_today,
    })
  }
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update(json)
    .eq('user_id', user)
    .eq('ticker', ticker);
});