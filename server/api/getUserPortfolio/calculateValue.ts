//@ts-nocheck
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const getUserCurrency = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('currency')
      .eq('user_id', body.record.user_id)
      .limit(1)
      .single();
    return data.currency;
  };
  const getUserPortfolio = async () => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select()
      .eq('user_id', body.record.user_id)
      .eq('ticker', body.record.ticker)
    return data;
  }
  const currency = await getUserCurrency();
  const portfolio = await getUserPortfolio();
  const assetPrice = await messaging.getAssetPrice(supabase, currency, body.record.ticker);
  const array = []

  for (let i = 0; i < portfolio.length; i++) {
    array.push({
      'user_id': body.record.user_id,
      'date': body.record.date,
      'value_currency': currency,
      'ticker': portfolio[i].ticker,
      'value': portfolio[i].quantity_today/assetPrice
    })
  }
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update(...array)
    .eq('ticker', body.record.ticker)
    .eq('user_id', body.record.user_id)
    .select()
  if(data) return data
  if(error) return error
});