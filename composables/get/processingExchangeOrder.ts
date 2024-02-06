import { ok } from '~/composables/ok'

export const getProcessingExchangeOrder = async (client, id) => {
  const { data, error } = await client
    .from('topic_exchange')
    .select()
    .eq('id', id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', 'could not getProcessingExchangeOrder: '+error.message)
    return {
      error: error
    }
  } else {
    const merged = ok.merge(data, 'id')[0];
    return {
      data: merged
    }
  }
};