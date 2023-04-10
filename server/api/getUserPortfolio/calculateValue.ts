import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

const updateUserPortfolio = async (userId, preferredCurrency, ticker, supabase) => {
  const portfolio = await getUserPortfolio(userId, supabase);

  for (const portfolioItem of portfolio) {
    const { quantity_change, date } = portfolioItem;
    
    const assetPrice = await messaging.getAssetPrice(supabase, preferredCurrency, ticker);
    const value = quantity_today / assetPrice;
    
    await updatePortfolioValue(userId, date, ticker, value, preferredCurrency, supabase);
  }
};

const getUserPortfolio = async (userId, supabase) => {
  const { data } = await supabase
    .from('get_user_portfolio')
    .select()
    .eq("user_id", userId);

  return data;
};

const getPreferredCurrencies = async (supabase) => {
  const { data } = await supabase
    .from('get_user')
    .select('user_id, currency');

  return data;
};

const updatePortfolioValue = async (userId, date, ticker, value, preferredCurrency, supabase) => {
  const { data } = await supabase
    .from('get_user_portfolio')
    .update({
      'value': value,
      'value_currency': preferredCurrency
    })
    .eq('user_id', userId)
    .eq('date', date)
    .eq('ticker', ticker)
    .select();
};

export default defineEventHandler(async (event) => {
  return 'im fucked'
  const supabase = serverSupabaseServiceRole(event);
  const ticker = 'gi.ddf';

  const userPreferredCurrencies = await getPreferredCurrencies(supabase);

  for (const { user_id, currency } of userPreferredCurrencies) {
    await updateUserPortfolio(user_id, currency, ticker, supabase);
  }

  return 'Values have been calculated and updated';
});