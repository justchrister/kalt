import { ok } from '~/composables/ok'
import { get } from '~/composables/get'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  return await get(supabase).sharePrices() as any;
});