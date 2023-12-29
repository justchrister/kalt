import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { pub } from '~/composables/messaging'
import { generate, count } from 'random-words';

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const user = await get(supabase).user(body.record.id) as user;
  const generateCode = () => {
    const one = generate({ minLength: 4, maxLength: 7 });
    const two = generate({ minLength: 5, maxLength: 7 });
    const three = generate({ minLength: 4, maxLength: 7 });
    return one + '-' + two + '-' + three
  }
  // get data from on-boarding flow here
  for (let i = 0; i < 3; i++) {
    const generatedCode = generateCode()
    await pub(supabase, {
      sender:'server/api/invites/initialize.ts',
      id: user.id
    }).invites({
      issuedTo: user.id,
      used: false,
      code: generatedCode
    } as user );
  }
  return 'initialized'
});