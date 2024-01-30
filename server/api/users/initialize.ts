import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if (!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const user = await get(supabase).user(body.record.id) as user;
  // get data from on-boarding flow here
  await pub(supabase, {
    sender: 'server/api/users/initialize.ts',
    id: user.id
  }).users({
    currency: 'EUR',
    language: 'ENG',
    autoVest: 1,
    newsletters: true,
    termsOfService: true,
    performanceUpdates: true
  } as user);
  return 'initialized'
});