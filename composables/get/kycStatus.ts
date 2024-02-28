import { ok } from '~/composables/ok'

export const getKycStatus = async (client: any, auth: any) => {
  const { data, error } = await client
    .from('topic_kyc')
    .select()
    .eq('id', auth.id) as kyc[];

  if(!data.length>1 || !data) return false
  
  const merged = ok.merge(data, 'id') as kyc

  if(merged.politicallyExposed !== null && merged.sourceOfFunds !== null ) {
    if(merged.incomeRangeFrom|| merged.incomeRangeTo){
      const { data:proofOfAddress, error: proofOfAddressError } = await client
        .storage
        .from('proofOfAddress')
        .list(auth.id, {
          limit: 1,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })
      
      const { data:userIdentification, error:userIdentificationError } = await client
        .storage
        .from('userIdentification')
        .list(auth.id, {
          limit: 1,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })
      if(proofOfAddress.length>0 && userIdentification.length>0) return true
    }
  }

  return false
};