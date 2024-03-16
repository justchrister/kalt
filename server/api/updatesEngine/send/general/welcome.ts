import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)

  let data = null
  let error = null

  const getAvailableUpdates = async () => {
    const { data, error } = await supabase
      .from('topic_updateRepository')
      .select()
      .order('timestamp', { ascending: false })

    const merged = ok.merge(data, 'id')
    const filtered = []
    for (let i = 0; i < data.length; i++) {
      if(data[i].active && data[i].channel === 'welcome') {
        filtered.push(data[i])
      }
    }
    return filtered
  }

  const getUsersInCohort = async () => {
    const { data, error } = await supabase
      .from('topic_users')
      .select()
      .order('timestamp', { ascending: false })
    
    const merged = ok.merge(data, 'id')

    // filter on only the ones where the cohorts array includes 'new'
    let userids = []
    for (let i = 0; i < data.length; i++) {
      if(data[i].cohorts?.includes('new')) {
        userids.push(data[i])
      }
    }
    return userids
  }
  const getUsersThatHaveAlreadyReceivedUpdate = async () => {
    const { data, error } = await supabase
      .from('topic_updates')
      .select()
      .eq('channel', 'welcome')
      .eq('cohort', 'new')
      .order('timestamp', { ascending: false })
    const filtered = []
    for (let i = 0; i < data.length; i++) {
      filtered.push(data[i].userId)
    }
    console.log('filtered', filtered)
    return filtered
  }

  const relevantUsers = await getUsersInCohort()
  const availableUpdates = await getAvailableUpdates()
  const usersThatHaveAlreadyReceivedUpdate = await getUsersThatHaveAlreadyReceivedUpdate()
  
  for (let i = 0; i < relevantUsers.length; i++) {
    if(usersThatHaveAlreadyReceivedUpdate.includes(relevantUsers[i].id)) return
    // pick one random update
    const randomUpdate = availableUpdates[Math.floor(Math.random() * availableUpdates.length)]
    // send the update to the user
    const { data, error } = await supabase
      .from('topic_updates')
      .insert({
        sender: 'server/api/updatesEngine/send/general/welcome.ts',
        'userId': relevantUsers[i].id,
        'updateId': randomUpdate.id,
        cohort: 'new',
        read: false,
        channel: 'welcome',
        category: randomUpdate.category,
        messages: randomUpdate.messages,
        title: randomUpdate.title,
        ingress: randomUpdate.ingress
      })
    if(error) console.log(error)
  }
  return { data, error }
});