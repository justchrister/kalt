// @ts-nocheck
import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const generateDates = async (userId, currency) => {
    const array = [];
    const today = new Date();
    for (let i = 0; i < 99; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      array.push(
        {
          'date': date,
          'ticker': 'gi.ddf',
          'userId': userId,
          'value': 0,
          'valueCurrency': currency
        }
      )
    }
    return array
  }


  const insertDate = async (json) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .insert(json)
  }
  const getUsers = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('userId, currency')
    return { data, error}
  };

  const { data: users, error} = await getUsers();
  if(error) return{ 'error': error }
  for (let i = 0; i < users.length; i++) {
    const dates = await generateDates(users[i].userId, users[i].currency);
    for (let j = 0; j < dates.length; j++) {
      await insertDate(dates[j])
    }
  }
  return 'dates added for users'
});