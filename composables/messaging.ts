import { ok } from '~/composables/ok'

export const messaging = {
  getEntity: async (supabase, topic, entity_id) => {
    const topicKebab = ok.camelToKebab(topic)
    const { data, error } = await supabase
      .from(topicKebab)
      .select()
      .eq('message_entity_id', entity_id)
      .order('message_created', { ascending: true })
    return ok.combineJson(data)
  },
  read: async (supabase, topic, service, message_id) => {
    const topicKebab = ok.camelToKebab(topic)
    const serviceKebab = ok.camelToKebab(service)
    const subscription = serviceKebab+'__'+topicKebab

    const { data: sub, error: subError } = await supabase
      .from(subscription)
      .update({ message_read: true })
      .eq('message_id', message_id)

    return 'read'
  },
  getAssetPrice: async (supabase, currency, ticker) => {
    const { data, error } = await supabase
      .from('asset_prices')
      .select('asset_price')
      .eq('currency', currency)
      .eq('ticker', ticker)
      .limit(1)
      .single()
    return data.asset_price
  },
  convertCurrency: async (supabase, amount, from, to) => {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('value')
      .eq('from', from)
      .eq('to', to)
      .limit(1)
      .single()
    if(error) return amount
    return amount*data.value
  },
  cleanMessage: async (message) => {
    const json = Object.entries(message).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    delete json.message_id
    delete json.message_entity_id
    delete json.message_created
    delete json.message_sender
    return json
  }
};