import { ok } from '~/composables/ok'

export const getUser = async (client, auth) => {
  let userId = auth.id;
  let email = auth.email;
  if (!auth.id) {
    userId = auth;
  }
  if (!auth.email) {
    email = null;
  }
  const { data } = await client
    .from('topic_users')
    .select()
    .eq('id', userId)
    .order('timestamp', { ascending: true })
  const merged = ok.merge(data, 'id')[0] as user;
  if (!merged) {
    return {
      "id": userId,
      email,
      auth
    } as user
  } else {
    return {
      ...merged,
      email,
      auth
    } as user
  }
};