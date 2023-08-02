// @ts-nocheck
import { ok } from '~/composables/ok'

export const messaging = {
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
};