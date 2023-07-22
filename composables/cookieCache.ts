// @ts-nocheck
import { ok } from '~/composables/ok'

export const get = {
  user: async (supabase) => {
    const userCookie = useCookie('getUser');
    const fetchSupabase = async () => {
      const { data, error } = await supabase
        .from('get_user')
        .select()
        .limit(1)
        .single()
      userCookie.value = { data }
    }
    if(userCookie.value){
      fetchSupabase()
      return userCookie.value
    } else {
      const supabaseUser = await fetchSupabase()
      return data
    }
  }
}