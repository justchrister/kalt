import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)

  const getCodes = async () => {
    const { data, error } = await supabase
      .from('topic_invites')
      .select()
      .eq('code', query.code)
      .order('timestamp', { ascending: true })
    return { data, error }
  }

  const useCode = async (id: string) => {
    if (!id) {
      return false
    }
    const json = {
      sender: 'server/api/invites/validate.ts',
      id: id,
      code: query.code,
      used: true
    } as invite
    const { data, error } = await supabase
      .from('topic_invites')
      .insert(json)
      .select()
    if (data) return true
    if (!data || error) {
      ok.log('error', 'failed to useCode: '+error.message)
      return false
    }
  }
  let status = 'error';
  const { data, error } = await getCodes()
  if (error) {
    status = 'error'
  } else if (data) {
    const merged = ok.merge(data, 'id')[0]
    if (merged?.used) {
      status = 'used'
    } else if (merged?.id) {
      await useCode(merged?.id)
      status = 'valid'
    }
  }
  return { status }
});