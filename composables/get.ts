import { ok } from '~/composables/ok'
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
export const get = (client: any) => {
  return {
    userDefinedFunds: async (userId: any, ticker: any) => {
      const { data, error } = await client 
        .from('topic_userDefinedFunds')
        .select()
        .eq('id', userId)
        .eq('ticker', ticker)
        .order('timestamp', { ascending: true })
      if(error) {
        return null
      } else {
        return ok.combineJson(data)
      }
    },
    funds: async () => {
      const { data, error } = await client
        .from('sys_funds')
        .select()
      if(error){
        ok.log('error', error)
        return
      } else {
        return data
      }
    },
    defaultPaymentMethod: async (user: user) => {
      return
    },
    openExchangeOrder: async (ticker: any, type: any, quantityAbsolute: any) => {
      const { data, error } = await client
        .from('topic_exchange')
        .select()
        .eq('ticker', ticker)
        .eq('type', type)
        .order('timestamp', { ascending: true })
      if(error){
        return error
      } else {
        const combined = ok.combineJsonByKeys(data, 'id');
        const unfulfilledOrders = combined.filter(message => message.status === 'open');
        const ordersWithQuantityAbsolute = unfulfilledOrders.map(message => {
          message.quantityAbsolute = Math.abs(message.quantity);
          return message;
        });
        const order = ordersWithQuantityAbsolute.find(message => message.quantityAbsolute >= quantityAbsolute);
        return order;
      }
    },
    languageDetails: async (iso: any) => {
      const { data, error } = await client
        .from('sys_languages')
        .select()
        .eq('available', true)
        .eq('iso', iso || 'ENG')
        .limit(1)
        .single()
      if(error) {
        return {
          iso: '?',
          name: 'Could not get language details'
        }
      } else {
        return data
      }
    },
    processingExchangeOrder: async (orderId: any) => {
      const { data, error } = await client
        .from('topic_exchange')
        .select()
        .eq('id', orderId)
        .order('timestamp', { ascending: true })
      if(error){
        ok.log('error', error)
        return 'error'
      } else {
        return ok.merge(data, 'id')[0]
      }
    },
    key: async (auth: any) => {
      let userId = auth.id;
      if(!auth.id) userId = auth;
      const { data, error } = await client
        .from('topic_keys')
        .select()
        .eq('id', userId)
        .order('timestamp', { ascending: true })
        .limit(1)
        .single()
      
      if (error) return null

      return data.key;
    },
    user: async (auth: any) => {
      let userId = auth.id;
      let email = auth.email;
      if(!auth.id){
        userId = auth;
      }
      if(!auth.email){
        email = null;
      }
      const { data } = await client 
        .from('topic_users')
        .select()
        .eq('id', userId)
        .order('timestamp', { ascending: true })
      const merged = ok.merge(data, 'id')[0] as user;
      if(!merged) {
        return {
          "id": userId,
          email, 
          auth
        } as user
      } else {
        return {
          ...merged, 
          email, 
          auth
        } as user
      }
    },
    transactions: async (user: any) => {
      const { data, error } = await client 
        .from('topic_transactions')
        .select()
        .eq('userId', user.id)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', error)
        return null
      } else {
        return ok.combineJsonByEntity(data).reverse();
      }
    },
    linkedBankAccount: async (user: any) => {
      const { data, error } = await client
        .from('topic_linkedBankAccounts')
        .select()
        .eq('userId', user.id)
        .order('timestamp', { ascending: true })
      if(error || data.length === 0 || !data) {
        return null
      } else {
        return ok.merge(data, 'id')[0];
      }
    },
    sharePrices: async () => {
      const { data:originOrders } = await client
        .from('topic_exchange')
        .select()
        .order('timestamp', { ascending: true })
        .eq('origin', true)
      
      const { data: assetList } = await client
        .from('topic_assets')
        .select()
        .order('timestamp', { ascending: true })
      const assets = ok.combineJsonByKeys(assetList, 'ticker');
      
      const shares = {};
      originOrders.forEach(message => {
        if (shares[message.ticker]) {
          shares[message.ticker] -= message.quantity;
        } else {
          shares[message.ticker] = -message.quantity;
        }
      });

      const result = {};
      assets.forEach(asset => {
        const ticker = asset.ticker;
        if (shares[ticker]) {
          result[ticker] = asset.value / shares[ticker];
        }
      });

      return result;
    },
    exchangeRates: async(from, to) => {
      if(from===to) return 1;
      const { data, error } = await client
        .from('topic_exchangeRates')
        .select()
        .eq('from', from)
        .eq('to', to)
        .order('timestamp', { ascending: true })
        .limit(1)
        .single()
      if(error) {
        ok.log('warn', 'could not get exchange rates')
        return null
      } else {
        return data.rate
      }
    },
    userDefinedFund: async(userId) => {
      const { data, error } = await client
        .from('topic_userDefinedFunds')
        .select()
        .eq('userId', userId)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', error)
        return null
      } else {
        return ok.combineJsonByKeys(data, 'ticker')
      }
    },
    portfolio: async(user) => {
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
    },
    subscription: async(userId) => {
      const { data, error } = await client
        .from('topic_userSubscriptions')
        .select()
        .eq('userId', userId)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', error)
        return null
      } else {
        const combined = ok.combineJson(data)
        return ok.cleanMessage(combined)
      }
    },
    autoInvest: async(user: user) => {
      const { data, error } = await client
        .from('topic_autoInvest')
        .select()
        .eq('id', user.id)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', error)
        return null
      } else {
        const combined = ok.combineJson(data)
        return ok.cleanMessage(combined) as autoInvest
      }
    },
    accountBalance: async(user: user) => {
      const { data, error } = await client
        .from('topic_transactions')
        .select()
        .eq('userId', user.id)
        .order('timestamp', { ascending: true })
      const merged = ok.merge(data, 'id');
      ok.log('', merged)
      if(error) {
        ok.log('warn', error)
        return ok.formatCurrency(0, user.currency)
      } else {
        const filtered = merged.filter(message => (message.type === 'deposit' && message.status === 'complete') || (message.type === 'withdraw' && (message.status === 'complete' || message.status === 'pending')));
        const result = filtered.reduce((acc, message) => acc + message.amount, 0);
        return ok.formatCurrency(result, user.currency)
      }
    },
    paymentMethod: async (user: user)=>{
      ok.log('', user.id)
      const { data, error } = await client
        .from('topic_paymentMethods')
        .select()
        .eq('id', user.id)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', 'failed getting payment method: ', error)
        return null
      } else {
        const combined = ok.combineJson(data)
        return ok.cleanMessage(combined)
      }
    },
    card: async (user: user) => {
      const { data, error } = await client
        .from('topic_cards')
        .select()
        .eq('userId', user.id)
        .order('timestamp', { ascending: true })
      if(error) {
        ok.log('error', error)
        return null
      } else {
        const combined = ok.merge(data, 'id');
        return combined[0];
      }
    }
  }
}