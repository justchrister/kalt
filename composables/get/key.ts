import { ok } from '~/composables/ok'
import { get } from '~/composables/get'

export const getKey = async (client, auth) => {
  let userId = auth.id;
  if(!auth.id) userId = auth;
  const { data, error } = await client
    .from('topic_keys')
    .select()
    .eq('id', userId)
    .order('timestamp', { ascending: true })
    .limit(1)
    .single()
  
  if (error) return null

  return data.key;
};