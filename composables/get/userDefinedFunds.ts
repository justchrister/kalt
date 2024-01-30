import { ok } from '~/composables/ok'

export const getUserDefinedFunds = async (client, user, ticker) => {
  const { data, error } = await client
    .from('topic_userDefinedFunds')
    .select()
    .eq('id', user.id)
    .eq('ticker', ticker)
    .order('timestamp', { ascending: true })
  if (error) {
    return null
  } else {
    return ok.merge(data, 'id')[0]
  }
};