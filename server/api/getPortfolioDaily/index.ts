import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const body = await readBody(event)

  // create order and update the 
  if (transaction_incomplete){
    const { data, error } = await supabase
      .from('transactions')
      .update({
        transaction_id: transaction_incomplete.transaction_id,
      })
      .select()
      .single()
  }
});