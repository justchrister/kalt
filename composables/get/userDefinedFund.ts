import { ok } from '~/composables/ok'

export const getUserDefinedFund = async (client, user) => {
  const { data, error } = await client
    .from('topic_userDefinedFunds')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', error)
    return null
  } else {
    return ok.combineJsonByKeys(data, 'ticker')
  }
};