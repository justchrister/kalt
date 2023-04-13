import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const ticker = 'gi.ddf';
  const body = await readBody(event)
  const user_id = body.record.user_id;
  const today = new Date();

  const insertDate = async (date) => {
    const { data, error } = await supabase
    .from('get_user_portfolio')
    .insert({
      'date': date,
      'ticker': ticker,
      'user_id': user_id
    })
  }

  const { data, error } = await supabase
    .from('get_user_portfolio')
    .select('date')
    .eq('user_id', user_id)
    .eq('ticker', ticker)
    .order('date', { ascending: true })
    .limit(1)
    .single();  
  
  return data.date
});