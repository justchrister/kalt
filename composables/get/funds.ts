import { ok } from '~/composables/ok'

export const getFunds = async (client) => {
  const { data, error } = await client
    .from('sys_funds')
    .select()
  if(error){
    ok.log('error', error)
    return
  } else {
    return data
  }
};