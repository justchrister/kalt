import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  const ticker = 'gi.ddf';
  // get exchange Rates
  const getPortfolios = async (user) => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select()
    return data
  };
  const getPreferredCurrencies = async () => {
    const {data, error} = await supabase
      .from('get_user')
      .select('user_id, currency')
    console.log(error)
    console.log(data)
    return data
  }
  const calculateValues = async (firstOrderDate, user, ticker) => {
    const today = new Date();
    const array = [];
    for (let currentDate = firstOrderDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      array.push({
        user_id: user,
        ticker: ticker,
      });
    }
    console.log(array)
    return array
  }
  const portfolios = getPortfolios();
  console.log(portfolios)
  const userPreferredCurrencies = getPreferredCurrencies();
  console.log(userPreferredCurrencies)
//  const combinedArray = ok.combineArrays(portfolios, userPrefferedCurrencies)


  return userPreferredCurrencies
});
