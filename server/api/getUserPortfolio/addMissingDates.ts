import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server';

const getFirstOrderDate = async (user, supabase) => {
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
  for (
    let currentDate = firstOrderDate;
    currentDate <= today;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateWithoutTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    array.push({
      user_id: user,
      ticker: ticker,
      date: dateWithoutTime,
    });
  }
  return array;
};

const getUsers = async (supabase) => {
  const { data: users } = await supabase.from('get_user').select('user_id');
  return users;
};

const upsertDates = async (dates, user, ticker, supabase) => {
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .upsert(dates)
    .eq('user_id', user)
    .eq('ticker', ticker);
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const ticker = 'gi.ddf';

  const users = await getUsers(supabase);

  for (const { user_id } of users) {
    const firstOrderDate = await getFirstOrderDate(user_id, supabase);
    const dates = await createDates(firstOrderDate, user_id, ticker);
    await upsertDates(dates, user_id, ticker, supabase);
  }

  return users;
});