// @ts-nocheck
import { ok } from '~/composables/ok'

export const getUser = async (supabase) => {
  const userCookie = useCookie('user');
  const getSetUser = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select()
      .limit(1)
      .single()
    if(data) ok.log('success', 'got user: ', data.first_name+' '+data.last_name, data.userId)
    if(error) ok.log('error', 'could not get user: ', error)
    userCookie.value = { data }
  }
  if(userCookie.value){
    console.log('using cookie')
    getSetUser()
    return userCookie.value
  } else {
    console.log('using supabase')
    const supabaseUser = await getSetUser()
    return data
  }
}