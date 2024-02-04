import { ok } from '~/composables/ok'

export const getAutoInvest = async (client, user) => {
  const { data, error } = await client
    .from('topic_autoInvest')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if (error || data.length === 0) {
    ok.log('error', error)
    return null
  } else {
    const combined = ok.merge(data, 'id')[0];
    return ok.cleanMessage(combined) as autoInvest
  }
};