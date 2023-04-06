export const messaging = {
  getEntity: async (supabase, topic, entity_id) => {
    const topicKebab = ok.camelToKebab(topic)

    const { data, error } = await supabase
      .from(topicKebab)
      .eq('message_entity_id', entity_id)
      .select()
      .order('message_created', { ascending: false })

    return ok.combineJson(data)
  },
  readMessage: async (supabase, topic, service, message_id) => {
    const topicKebab = ok.camelToKebab(topic)
    const serviceKebab = ok.camelToKebab(service)
    const subscription = topicKebab + '__' + serviceKebab

    const { data: sub, error: subError } = await supabase
      .from(subscription)
      .update({ message_read: true })
      .eq('message_id', message_id)

    return 'read'
  },
  getAssetPrice: async (supabase, currency) => {
    const { data, error } = await supabase
      .from('asset_prices')
      .select('value')
      .eq('iso', currency)
      .eq('ticker', 'gi.ddf')
      .limit(1)
      .single()
    return data.value
  },
};