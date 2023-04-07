import { ok } from '~/composables/ok'

export const messaging = {
  getEntity: async (supabase, topic, entity_id) => {
    const topicKebab = ok.camelToKebab(topic)
    const { data, error } = await supabase
      .from(topicKebab)
      .select()
      .eq('message_entity_id', entity_id)
      .order('message_created', { ascending: false })
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
};