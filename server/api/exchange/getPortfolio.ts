import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(runtimeConfig.supabase_url, runtimeConfig.supabase_service_role)

  return "Lol"
})