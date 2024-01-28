import { ok } from '~/composables/ok'
import { get } from '~/composables/get'

const filterOnOnlyFulfilledOrders = async (orders: any) => {
  const fulfilledOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status !== 'fulfilled') {
      continue;
    } else {
      const filtreredArray = orders.filter(message => message.id === orders[i].id);
      const order = ok.combineJsonByKeys(filtreredArray, 'id');
      fulfilledOrders.push(...order);
    }
  }
  return fulfilledOrders;
}

export const getPortfolio = async (client, user) => {

  const assetPrices = await get(client).sharePrices() as any;
  const convertedCurrency = await get(client).exchangeRates('EUR', user.currency) || 1;
  const { data: orders, error } = await client
    .from('topic_exchange')
    .select('userId, timestamp, id, quantity, status, ticker', )
    .eq('userId', user.id)
    .order('timestamp', { ascending: true })
  if(error){
    return {
      error: error
    }
  }
  const fulfilledOrders = await filterOnOnlyFulfilledOrders(orders);
  const portfolio = [];
  const dateValueMap = {};
  let value = 0;

  for (let i = 0; i < fulfilledOrders.length; i++) {
    const fulfilledOrder = fulfilledOrders[i];
    const ticker = fulfilledOrder.ticker;
    const currencyConvertedSharePrice = assetPrices[ticker] * convertedCurrency;
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

  const latestDate = new Date();
  latestDate.setHours(0, 0, 0, 0);


  // Ensure it goes back at least 365 days
  let firstDate = new Date(latestDate);
  firstDate.setDate(latestDate.getDate() - 365);

  let runningValue = 0;  // Renamed from 'value' to 'runningValue'

  // Looping through the date range and filling missing ones
  while (firstDate <= latestDate) {
    const dateStr = firstDate.toISOString().split('T')[0];
    let todaysValueChange = dateValueMap[dateStr] || 0;

    runningValue += todaysValueChange;  // Use 'runningValue' here

    portfolio.push({
      date: dateStr,
      value: runningValue,  // And here
    });

    firstDate.setDate(firstDate.getDate() + 1);
  }

  return portfolio;
}