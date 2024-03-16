import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { pub } from '~/composables/messaging'

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  const getUsers = async () => {
    const {data, error} = await supabase
      .from('topic_users')
      .select()
      .order('timestamp', {ascending: false})
    if(error){
      return {error}
    } else {
      const merged = ok.merge(data, 'id')
      return merged
    }
  }

  const adjustCohorts = async (userObject: user) => {
    const threeDaysMs = 3*24*60*60*1000;
    const currentTimeMs = Date.now();
    const userTimestampMs = new Date(userObject.timestamp).getTime();
        
    const user = await get(supabase).user(userObject.id)

    let cohorts = [];

    if(userTimestampMs > currentTimeMs - threeDaysMs){
      if(user.cohorts) cohorts=user.cohorts;
      if(cohorts.includes('new')) return;
      cohorts.push('new');
      ok.log('','Cohort appended: '+userObject.id);
    } 
    if(userTimestampMs < currentTimeMs - threeDaysMs){
      if(!user.cohorts) return;
      cohorts = user.cohorts;
      cohorts = cohorts.filter(item => item !== 'new');
      ok.log('','Cohort removed: '+userObject.id);
    }
    const error = await pub(supabase, {
        sender:'server/api/updatesEngine/cohorts/new.ts'
      }).users({
        id: user.id,
        cohorts
      });
    }

  const users = await getUsers();
  
  for (let i = 0; i < users.length; i++) {
    await adjustCohorts(users[i])
  }
  return 'Cohort updated'
});