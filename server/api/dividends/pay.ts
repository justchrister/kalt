import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const currency = body.record.currency;
  const node = body.record.node_id;
  
  if (!currency){
    oklog('error', 'currency missing from body')
    return {
      'error' : 'currency missing from body'
    }
  }

  
/*

Do this: 

each time a new record is added to dividends
you check that ones currency, 

if that ones currency does not have more than 1000 entries in status 0, 
then you dont do anything to it. 

if it does, you change them to status 1 and calculate a payout

*/
  return "data"
  });