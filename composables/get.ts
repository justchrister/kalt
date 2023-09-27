import { ok } from '~/composables/ok'

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
    user: async (userId: any) => {
      const { data:userPreferences } = await client 
        .from('topic_userPreferences')
        .select()
        .eq('message_entity', userId)
        .order('message_sent', { ascending: true })
      const { data:userDetails } = await client 
        .from('topic_userDetails')
        .select()
        .eq('message_entity', userId)
        .order('message_sent', { ascending: true })
      const userDetailsCombined =ok.combineJson(userDetails);
      const userPreferencesCombined =ok.combineJson(userPreferences);
      if(!userDetails || !userPreferences) {
        return null
      } else {
        return {
          userId: userId,
          firstName: userDetailsCombined.firstName || null,
          lastName: userDetailsCombined.lastName || null,
          country: userDetailsCombined.country || null,
          city: userDetailsCombined.city || null,
          postalCode: userDetailsCombined.postalCode || null,
          birthdate: userDetailsCombined.birthdate || null,
          addressLine1: userDetailsCombined.addressLine1 || null,
          addressLine2: userDetailsCombined.addressLine2 || null,
          autoInvest: userPreferencesCombined.autoInvest || null,
          newsletters: userPreferencesCombined.newsletters || null,
          termsOfService: userPreferencesCombined.termsOfService || null,
          performanceUpdates: userPreferencesCombined.performanceUpdates || null,
          colorScheme: userPreferencesCombined.colorScheme || null,
          profilePicture: userPreferencesCombined.profilePicture || null,
          language: userPreferencesCombined.language || null,
          currency: userPreferencesCombined.currency || null
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
    sharePrices: async () => {
      const { data:originOrders } = await client
        .from('topic_exchangeOrders')
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
      if(error) {
        ok.log('', error)
        return null
      } else {
        return ok.combineJsonByEntity(data).reverse();
      }
    }
  }
}