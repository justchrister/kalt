import { ok } from '~/composables/ok'

export const getFunds = async (client) => {
  const { data, error } = await client
    .from('sys_funds')
    .select()
    .neq('state', 'inactive')
  if (error) {
    ok.log('error', 'could not getFunds: '+error.message)
    return
  } else {
    ok.log('', 'got funds')
    return data
  }
};