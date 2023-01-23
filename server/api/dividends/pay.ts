import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const currency = body.currency;
  
  if (!currency){
    oklog('error', 'currency missing from body')
    return {
      'error' : 'currency missing from body'
    }
  }
  oklog('success', 'dividend registered: ' + data.dividend_id)
  return "data"
  });