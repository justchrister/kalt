import { ok } from '~/composables/ok'

export const getProcessingExchangeOrder = async (client, id) => {
  const { data, error } = await client
    .from('topic_exchange')
    .select()
    .eq('id', id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', error)
    return 'error'
  } else {
    return ok.merge(data, 'id')[0]
  }
};