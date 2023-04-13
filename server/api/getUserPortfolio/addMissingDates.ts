// @ts-nocheck
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const insertDate = async (date) => {
    const { data, error } = await supabase
    .from('get_user_portfolio')
    .insert({
      'date': date,
      'ticker': 'gi.ddf',
      'user_id': body.record.user_id
    })
  }

  const { data, error } = await supabase
    .from('get_user_portfolio')
    .select('date')
    .eq('user_id', body.record.user_id)
    .order('date', { ascending: true })
    .limit(1)
    .single();
  
  const start = new Date(data.date);
  const end = new Date();

  while (start <= end) {
    await insertDate(start);
    start.setDate(start.getDate() + 1);
  };

  return 'dates added'
});