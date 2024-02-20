import { ok } from '~/composables/ok'

export const getKycStatus = async (client: any, auth: any) => {
  const { data, error } = await client
    .from('topic_kyc')
    .select()
    .eq('id', auth.id) as kyc[];
  if(!data.length>1 || !data) return false

  const merged = ok.merge(data, 'id')
  if(merged.politicallyExposed && merged.sourceOfFunds ) return true

  return false
};