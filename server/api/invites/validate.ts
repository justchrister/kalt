import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)

  const getCodes = async () => {
    const { data, error } = await supabase
      .from('topic_invites')
      .select()
      .eq('code', query.code)
      .order('timestamp', { ascending: true })
    ok.log('', data)
    return {data, error}
  }

  const useCode = async (id: string) => {
    const json = {
      sender: 'server/api/invites/validate.ts',
      id, 
      code: query.code, 
      used: true 
    } as invite
    const { data, error } = await supabase
      .from('topic_invites')
      .insert(json)
      .select()
    if(data) return true
    if(!data || error) {
      return false
    }
  }
  let status = 'error';
  const { data, error } = await getCodes()
  if(error) status = 'error'
  if(data){
    const merged = ok.merge(data, 'id').single()
    ok.log('', merged)
    const setToUsed = await useCode(merged.id)
    if(merged.used){
      status = 'used'
    } else if(setToUsed){
      status = 'valid'
    }    
  }
  return {status}
});