import { ok } from '~/composables/ok'
const filterOnOnlyFulfilledOrders = async (orders: any) => {
  const fulfilledOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status !== 'fulfilled') {
      continue;
    } else {
      const filtreredArray = orders.filter(message => message.message_entity === orders[i].message_entity);
      const order = ok.combineJsonByKeys(filtreredArray, 'message_entity');
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
        .eq('message_entity', userId)
        .eq('ticker', ticker)
        .order('message_sent', { ascending: true })
      if(error) {
        return null
      } else {
        return ok.combineJson(data)
      }
    },
    openExchangeOrder: async (ticker: any, orderType: any, quantityAbsolute: any) => {
      const { data, error } = await client
        .from('topic_exchange')
        .select()
        .eq('ticker', ticker)
        .eq('orderType', orderType)
        .order('message_sent', { ascending: true })
      if(error){
        return error
      } else {
        const combined = ok.combineJsonByKeys(data, 'message_entity');
        const unfulfilledOrders = combined.filter(message => message.status === 'open');
        const ordersWithQuantityAbsolute = unfulfilledOrders.map(message => {
          message.quantityAbsolute = Math.abs(message.quantity);
          return message;
        });
        const order = ordersWithQuantityAbsolute.find(message => message.quantityAbsolute >= quantityAbsolute);
        return order;
      }
    },
    processingExchangeOrder: async (orderId: any) => {
      const { data, error } = await client
        .from('topic_exchange')
        .select()
        .eq('message_entity', orderId)
        .order('message_sent', { ascending: true })
      if(error){
        return 'error'
      } else {
        const combined = ok.combineJsonByKeys(data, 'message_entity');
        return combined[0];
      }
    },
    user: async (userId: any) => {
      const { data } = await client 
        .from('topic_users')
        .select()
        .eq('message_entity', userId)
        .order('message_sent', { ascending: true })
      const userCombined = ok.combineJson(data) as any;
      if(!userCombined) {
        return null
      } else {
        return {
          userId: userId,
          firstName: userCombined.firstName || null,
          lastName: userCombined.lastName || null,
          country: userCombined.country || null,
          city: userCombined.city || null,
          postalCode: userCombined.postalCode || null,
          birthdate: userCombined.birthdate || null,
          addressLine1: userCombined.addressLine1 || null,
          addressLine2: userCombined.addressLine2 || null,
          autoVest: userCombined.autoVest || null,
          newsletters: userCombined.newsletters || null,
          termsOfService: userCombined.termsOfService || null,
          performanceUpdates: userCombined.performanceUpdates || null,
          colorScheme: userCombined.colorScheme || null,
          profilePicture: userCombined.profilePicture || null,
          language: userCombined.language || 'EN',
          currency: userCombined.currency || 'EUR'
        }
      }
    },
    accountTransactions: async (userId: any) => {
      const { data, error } = await client 
        .from('topic_accountTransactions')
        .select()
        .eq('userId', userId)
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('', error)
        return null
      } else {
        return ok.combineJsonByEntity(data).reverse();
      }
    },
    linkedBankAccount: async (user: any) => {
      const { data, error } = await client
        .from('topic_linkedBankAccounts')
        .select()
        .eq('userId', user.userId)
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('', error)
        return null
      } else {
        const combined = ok.combineJsonByKeys(data, 'message_entity');
        return combined[0];
      }
    },
    sharePrices: async () => {
      const { data:originOrders } = await client
        .from('topic_exchange')
        .select()
        .order('message_sent', { ascending: true })
        .eq('origin', true)
      
      const { data: assetList } = await client
        .from('topic_assets')
        .select()
        .order('message_sent', { ascending: true })
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
      const { data, error } = await client
        .from('topic_exchangeRates')
        .select()
        .eq('from', from)
        .eq('to', to)
        .order('message_sent', { ascending: true })
        .limit(1)
        .single()
      if(error) {
        ok.log('', error)
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
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('', error)
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
        .select('userId, message_sent, message_entity, quantity, status, ticker', )
        .eq('userId', user.userId)
        .order('message_sent', { ascending: true })
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
        const dateObject = new Date(fulfilledOrder.message_sent);
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
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('', error)
        return null
      } else {
        const combined = ok.combineJson(data)
        return ok.cleanMessage(combined)
      }
    },
    autoInvest: async(userId) => {
      const { data, error } = await client
        .from('topic_autoInvest')
        .select()
        .eq('userId', userId)
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('', error)
        return null
      } else {
        const combined = ok.combineJson(data)
        return ok.cleanMessage(combined) as autoInvest
      }
    },
    accountBalance: async(user) => {
      const { data, error } = await client
        .from('topic_accountTransactions')
        .select()
        .eq('userId', user.userId)
        .eq('status', 'complete')
        .order('message_sent', { ascending: true })
      if(error) {
        ok.log('warn', error)
        return ok.formatCurrency(0, user.currency)
      } else {
        let result = 0;
        for (let i = 0; i < data.length; i++) {
          result += data[i].amount
        }
        return ok.formatCurrency(result, user.currency)
      }
    },
    paymentCard: async (user) => {
      const { data, error } = await client
        .from('topic_paymentCards')
        .select()
        .eq('userId', user.userId)
        .eq('default', true)
        .order('message_sent', { ascending: false })
      if(error) {
        ok.log('', error)
        return null
      } else {
        const combined = ok.combineJsonByKeys(data, 'number');
        return combined[0];
      }
    }
  }
}