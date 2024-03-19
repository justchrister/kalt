import { ok } from '~/composables/ok'

export default defineEventHandler( async (event) => {
  const cohortsNew = await fetch('/api/updatesEngine/cohorts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return 'Engine updated'
});