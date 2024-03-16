import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  // call the api/updateEngine/cohorts/new using fetch
  const cohortsNew = await fetch('http://localhost:3000/api/updatesEngine/cohorts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return 'Engine updated'
});