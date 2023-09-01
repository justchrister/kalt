//@ts-nocheck
import { pub, sub } from '~/composables/messaging';
import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('userId, currency')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };

  const getUserPortfolio = async (user) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select()
      .eq('userId', user)
      .eq('ticker', 'gi.ddf')
    return data;
  };


  const getAssetPrice = async () => {
    const assetPriceIndex = {};
    const { data, error } = await supabase
      .from('getAssetPrice')
      .select()
      .order('date', { ascending: false })
    if(!error){
      data.forEach(({ ticker, currency, price }) => {
        assetPriceIndex[`${ticker}_${currency}`] = price;
      });
      return assetPriceIndex
    } else {
      return error
    }
  };

  const calculateValues = async (user, portfolio, assetPrice, currency) => {
    const array = []
    let value = 0;
    for (let i = 0; i < portfolio.length; i++) {
      value = portfolio[i].quantityToday/assetPrice;
      array.push({
        'userId': user,
        'date': portfolio[i].date,
        'ticker': portfolio[i].ticker,
        'valueCurrency': currency,
        'value': value
      })
    }
    return array
  };
  const addCalculatedValue = async (json) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .update(json)
      .eq('ticker', json.ticker)
      .eq('date', json.date)
      .eq('userId', json.userId)
      .select()
    return {data, error}
  }
  const assetPrices = await getAssetPrice();
  ok.log('', 'got asset prices: ', assetPrices)

  const calculateAndAdd = async (user, currency) => {
    let inserted = []
    const portfolio = await getUserPortfolio(user);
    const assetPrice = assetPrices[`gi.ddf_${currency}`];
    const calculatedValue = await calculateValues(user, portfolio, assetPrice, currency);
    for (let i = 0; i < calculatedValue.length; i++) {
      const {data, error} = await addCalculatedValue(calculatedValue[i])
      
      if(data && calculatedValue[i].value !== 0) {
        inserted.push({
          'userId': calculatedValue[i].userId,
          'value': calculatedValue[i].value
        })
      }
    }
    return inserted
  };
  const users = await getUsers();
  let response = [];

  // Convert all calculateAndAdd to promises
  const allPromises = users.map(user => calculateAndAdd(user.userId, user.currency));

  // Execute promises in parallel
  const allResults = await Promise.all(allPromises);

  // Combine the results
  response = allResults.flat();

  return response;
});