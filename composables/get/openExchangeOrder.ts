import { ok } from '~/composables/ok'

export const getOpenExchangeOrder = async (client, ticker, type, quantityAbsolute) => {
  const { data, error } = await client
    .from('topic_exchange')
    .select()
    .eq('ticker', ticker)
    .eq('type', type)
    .order('timestamp', { ascending: true })
  if (error) {
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
};