import { ok } from '~/composables/ok'

export const getSharePrices = async (client) => {
  const { data: originOrders } = await client
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
};