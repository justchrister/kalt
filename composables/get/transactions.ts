import { ok } from '~/composables/ok'

export const getTransactions = async (client, user) => {
  const { data, error } = await client
    .from('topic_transactions')
    .select()
    .eq('userId', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', error)
    return null
  } else {
    return ok.merge(data, 'entity');
  }
};