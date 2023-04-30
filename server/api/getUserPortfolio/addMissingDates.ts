// @ts-nocheck
import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const getFirstInvestDate = async (userId) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('date')
      .eq('user_id', userId)
      .order('date', { ascending: true })
      .limit(1)
      .single();
    if(error) ok.log('error', 'could not get first invest date for '+userId+': ', error)
    return new Date(data.date)
  }
  const insertDate = async (date, userId) => {
    const { data, error } = await supabase
    .from('get_user_portfolio')
    .insert({
      'date': date,
      'ticker': 'gi.ddf',
      'user_id': userId
    })
  }
  const addDays = async (userId) => {
    const start = await getFirstInvestDate(userId);
    const end = new Date();
    while (start <= end) {
      await insertDate(start, userId);
      start.setDate(start.getDate() + 1);
    };
  };
  const getUsers = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('user_id')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  if(body.record.user_id==='all'){
    const users = await getUsers();
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      await addDays(users[i].user_id);
    }
  } else {
    await addDays(body.record.user_id);
  }
  return 'dates added'
});