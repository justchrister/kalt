import { serverSupabaseUser } from '#supabase/server';
const combineMessage = (jsonArray) => {
  let result = {};
  for (let i = 0; i < jsonArray.length; i++) {
      let jsonObj = jsonArray[i];
      for (let key in jsonObj) {
          result[key] = jsonObj[key];
      }
  }
  return result
}

const jsToSql = (string) => {
  return string.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}


export const messaging(async (event) => {
  read(topic, service, entity_id){
    const subscription = topic+'__'+service
    // get message
    const { data: subscription, error: subscriptionError } = await supabase
      .from('exchange_orders__get_portfolio_daily')
      .update({ message_read: true })
      .eq('message_id', entity_id)
      .select()

    // mark as read
    const { data: subscription, error: subscriptionError } = await supabase
      .from('exchange_orders__get_portfolio_daily')
      .update({ message_read: true })
      .eq('message_id', entity_id)
      .select()
  },
});