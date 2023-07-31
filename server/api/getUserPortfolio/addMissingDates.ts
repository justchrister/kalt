// @ts-nocheck
import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const getFirstInvestDate = async (userId) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select('date')
      .eq('userId', userId)
      .order('date', { ascending: true })
      .limit(1)
      .single();
    if(error) ok.log('error', 'could not get first invest date for '+userId+': ', error)
    return new Date(data.date)
  }
  const insertDate = async (date, userId) => {
    const { data, error } = await supabase
    .from('getUserPortfolio')
    .insert({
      'date': date,
      'ticker': 'gi.ddf',
      'userId': userId
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
      .from('getUser')
      .select('userId')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  if(!body){
    const users = await getUsers();
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      await addDays(users[i].userId);
    }
  } else {
    await addDays(body.record.userId);
  }
  return 'dates added'
});