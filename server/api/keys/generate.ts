import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
import { randomBytes } from 'crypto';


export default defineEventHandler( async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const user = await get(supabase).user(body.record.id) as user;
  const keyExists = await get(supabase).key(user);
  if(keyExists) return 'key already exists'
  
  const key = randomBytes(64).toString('hex');

  await pub(supabase, {
    sender: 'server/api/keys/generate.ts',
    id: user.id
  }).keys({key});
  
  return 'generated'
});