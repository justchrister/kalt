// @ts-nocheck
import { ok } from '~/composables/ok'

export const message = {
  get: async (supabase, topic, service) => {
    const topicKebab = ok.camelToKebab(topic)
    const serviceKebab = ok.camelToKebab(service)
    const subscription = serviceKebab+'__'+topicKebab
    
    const { data, error } = await supabase
      .from(topicKebab)
      .select()
      .eq('message_entity_id', entity_id)
      .eq('message_read', false)
      .order('message_created', { ascending: true })

    if(data){
      const { data: sub, error: subError } = await supabase
      .from(subscription)
      .update({ message_read: true })
      .eq('message_id', message_id)
    }
    const combinedMessage = ok.combineJson(data)
    const camelCase = ok.convertKeysToCamelCase(combinedMessage)
    return camelCase
  },
  post: async (supabase, topic, service) => {
    const topicKebab = ok.camelToKebab(topic)
    const serviceKebab = ok.camelToKebab(service)
    const subscription = serviceKebab+'__'+topicKebab
    
    const { data, error } = await supabase
      .from(topicKebab)
      .select()
      .eq('message_entity_id', entity_id)
      .order('message_created', { ascending: true })

    if(data){
      const { data: sub, error: subError } = await supabase
      .from(subscription)
      .update({ message_read: true })
      .eq('message_id', message_id)
    }
    const combinedMessage = ok.combineJson(data)
    const camelCase = convertKeysToCamelCase(combinedMessage)
    return camelCase
  }
};