import { ok } from '~/composables/ok'

export const getUserDefinedFund = async (client, user) => {
  const { data, error } = await client
    .from('topic_userDefinedFunds')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error','could not getUserDefinedFund: '+error.message)
    return null
  } else {
    const merged = ok.merge(data, 'id')[0] as userDefinedFund
    return merged
  }
};