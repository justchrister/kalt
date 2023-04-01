import { ok } from '~/composables/oklog'
import { serverSupabaseServiceRole } from '#supabase/server'


export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)
  
  const message = {
    "from": "exchange",
    "timestamp": oknow(),
    "message": ""
  }
  const from = "exchange";
  });