import { serverSupabaseServiceRole } from '#supabase/server';


const updatePortfolioQuantityToday = async (userId, date, ticker, quantity_today, supabase) => {
  await supabase
    .from('get_user_portfolio')
    .update({
      'quantity_today': quantity_today
    })
    .eq('user_id', userId)
    .eq('date', date)
    .eq('ticker', ticker);
};

const updateUserPortfolioQuantityToday = async (userId, ticker, supabase) => {
  const portfolio = await getUserPortfolio(userId, supabase);
  let quantity_today = 0;

  for (const portfolioItem of portfolio) {
    const { quantity_change, date } = portfolioItem;
    quantity_today += quantity_change;
    await updatePortfolioQuantityToday(userId, date, ticker, quantity_today, supabase);
  }
};

const getUserPortfolio = async (userId, supabase) => {
  const { data } = await supabase
    .from('get_user_portfolio')
    .select()
    .eq("user_id", userId)
    .order('date', { ascending: true });

  return data;
};

const getUsers = async (supabase) => {
  const { data } = await supabase
    .from('get_user')
    .select('user_id');

  return data;
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const ticker = 'gi.ddf';

  const users = await getUsers(supabase);

  for (const { user_id } of users) {
    console.log(user_id);
    console.log(ticker);
    await updateUserPortfolioQuantityToday(user_id, ticker, supabase);
  }

  return 'Quantity today has been calculated and updated';
});