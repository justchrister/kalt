
import { ok } from '~/composables/ok'

export const getUpdates = async (client: object, user:user) => {
  const { data, error } = await client
    .from('topic_updates')
    .select()
    .eq('userId', user.id)
  if(error){
    ok.log('error', error)
    return []
  } else if(data.length === 0) {
    ok.log('error', 'no rows returned')
    return []
  } else if(data.length === 1){
    return data as update[]
  } else {
    const merged = ok.merge(data, 'id') as update[];
    return merged
  }
};