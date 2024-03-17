
import { ok } from '~/composables/ok'

export const getUpdate = async (client: object, user:user, updateId:string) => {
  if(updateId){
    const { data, error } = await client
      .from('topic_updates')
      .select()
      .eq('id', updateId)
      .eq('userId', user.id)
    if(error){
      ok.log('error', error)
      return []
    } else if(data.length === 0) {
      ok.log('error', 'no rows returned')
      return []
    } else if(data.length === 1){
      return data[0]
    } else {
      const merged = ok.merge(data, 'id');
      return merged[0]
    }
  } else {
    return []
  }
};