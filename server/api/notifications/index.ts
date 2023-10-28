import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)
  const supabase = createClient(process.env.SUPABASE_URL, body.user.token)
  ok.log('success', 'supabase', supabase)
  return supabase
});