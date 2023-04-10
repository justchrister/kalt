import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  const body = await readBody(event);
  const ticker = 'gi.ddf';
  // get exchange Rates
  const getPortfolio = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select()
      .eq("user_id", user)
    return data
  };
  const getPreferredCurrencies = async () => {
    const {data, error} = await supabase
      .from('get_user')
      .select('user_id, currency')
    return data
  }
  const userPreferredCurrencies = await getPreferredCurrencies();

  for (let i = 0; i < userPreferredCurrencies.length; i++) {
    const preferredCurrency = userPreferredCurrencies[i].currency;
    const userId = userPreferredCurrencies[i].user_id;
    const portfolio = await getPortfolio(userId);
    let quantity_today = 0;
    for (let i = 0; i < portfolio.length; i++) {
      const quantityChange = portfolio[i].quantity_change;
      quantity_today += quantityChange;
      const { data, error } = await supabase
        .from('get_user_portfolio')
        .update({
          'value': await messaging.convertCurrency(
            supabase,
            quantity_today,
            portfolio[i].currency,
            preferredCurrency
          ),
          'value_currency': preferredCurrency,
          'quantity_today': quantity_today,
          'value_currency': preferredCurrency
        })
        .eq('user_id', userId)
        .eq('date', portfolio[i].date)
        .eq('ticker', ticker)
        .select()
      console.log(error)
    }
  }
  return 'Values has been calculated and updated'
});
