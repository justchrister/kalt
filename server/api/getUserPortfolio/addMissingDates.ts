import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const ticker = 'gi.ddf';
  
  const getFirstOrderDate = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('date')
      .eq('user_id', user)
      .order('date', { ascending: true })
      .limit(1)
      .single();
    if (data) return new Date(data.date); // Convert the date string to a Date object
    if (error) return error;
  };
  const createDates = async (firstOrderDate, user, ticker) => {
    const today = new Date();
    const array = [];
    for (let currentDate = firstOrderDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      array.push({
        user_id: user,
        ticker: ticker,
        date: dateWithoutTime,
      });
    }
    console.log(array)
    return array
  }
  const { data:users, error:usersError } = await supabase
    .from('get_user')
    .select('user_id')

  for (let i = 0; i < users.length; i++) {
    const user = users[i].user_id
    const firstOrderDate = await getFirstOrderDate(user)
    const dates = await createDates(firstOrderDate, user, ticker)
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .upsert(dates)
      .eq('user_id', user)
      .eq('ticker', ticker)
    console.log(error)
  }
  return users
});
