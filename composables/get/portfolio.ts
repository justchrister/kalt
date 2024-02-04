import { ok } from '~/composables/ok'
import { get } from '~/composables/get'

const filterOnOnlyFulfilledOrders = (orders: any) => {
  const fulfilledOrders = [];
  const ordersMerged = ok.merge(orders, 'id');
  for (let i = 0; i < ordersMerged.length; i++) {
    if (ordersMerged[i].status !== 'fulfilled') {
      continue;
    } else {
      fulfilledOrders.push(ordersMerged[i]);
    }
  }
  ok.log('', 'fulfilledOrders:', fulfilledOrders)
  return fulfilledOrders;
}

export const getPortfolio = async (client, user) => {

  const { data: sharePrices } = await $fetch('/api/exchange/sharePrices')
  
  const convertedCurrency = await get(client).exchangeRates('EUR', user.currency) || 1;
  const { data: orders, error } = await client
    .from('topic_exchange')
    .select()
    .eq('userId', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    return {
      error: error
    }
  }
  const fulfilledOrders = filterOnOnlyFulfilledOrders(orders);
  const portfolio = [];
  const dateValueMap = {};
  let value = 0;

  for (let i = 0; i < fulfilledOrders.length; i++) {
    const fulfilledOrder = fulfilledOrders[i];
    const ticker = fulfilledOrder.ticker;
    const currencyConvertedSharePrice = sharePrices[ticker] * convertedCurrency;
    const todaysValueChange = fulfilledOrder.quantity * currencyConvertedSharePrice;
    const dateObject = new Date(fulfilledOrder.timestamp);
    const date = dateObject.toISOString().split('T')[0];

    value += todaysValueChange;

    if (dateValueMap[date]) {
      dateValueMap[date] += todaysValueChange;
    } else {
      dateValueMap[date] = todaysValueChange;
    }
  }

  // Sort the dates to go from earliest to latest
  const sortedDates = Object.keys(dateValueMap).sort();
  ok.log('', 'sortedDates:', sortedDates)
  const latestDate = new Date();
  latestDate.setHours(0, 0, 0, 0);
  ok.log('', 'latestDate:'+latestDate)

  const numOfDays = 365;

  // Set the starting date to numOfDays days before the latestDate
  let firstDate = new Date(latestDate);
  firstDate.setDate(latestDate.getDate() - (numOfDays-1));
  
  let runningValue = 0;
  for (let i = 0; i <= numOfDays; i++) {
    // Create a new date for each iteration, adding 'i' days to firstDate
    let currentDate = new Date(firstDate);
    currentDate.setDate(firstDate.getDate() + i);
  
    const dateStr = currentDate.toISOString().split('T')[0];
    let todaysValueChange = dateValueMap[dateStr] || 0;
  
    runningValue += todaysValueChange;
    portfolio.push({
      date: dateStr,
      value: runningValue,
    });
  }
  ok.log('', 'portfolio', portfolio)
  return portfolio;
}