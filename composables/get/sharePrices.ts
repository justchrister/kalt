import { ok } from '~/composables/ok'

export const getSharePrices = async (client) => {
  if (process.client) {
    return {
      data: null,
      error: 'cannot be used unless server side. instead fetch from /api/exchange/sharePrices'
    }
  }
  const { data: originOrders, error: errorOriginOrders } = await client
    .from('topic_exchange')
    .select()
    .order('timestamp', { ascending: true })
    .eq('origin', true)

  if (errorOriginOrders) {
    return {
      data: null,
      error: errorOriginOrders
    }
  }
  if(originOrders.length === 0) {
    return {
      data: null,
      error: 'could not get originOrders'
    }
  }

  const { data: assetList, error: errorAssetList } = await client
    .from('topic_assets')
    .select()
    .order('timestamp', { ascending: true })
  
  const assets = ok.sum('value', assetList, 'ticker');
  
  if (errorAssetList) {
    ok.log('error', 'errorAssetList', errorAssetList)
    return {
      data: null,
      error: errorAssetList
    }
  }
  if(assetList.length === 0) {
    return {
      data: null,
      error: 'could not get assets'
    }
  }
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
  return {
    error: null,
    data: result
  };
};