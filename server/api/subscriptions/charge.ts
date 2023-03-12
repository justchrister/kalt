// @ts-nocheck

import { oklog } from '~/composables/oklog'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  const {data, error} = await supabase.from('subscriptions')
  .select()
  .eq('enabled', true)

  let toCharge = []
  const today = new Date().getDate()

  for (let i = 0; i < data.length; i++) {
    if(data[i].days.includes(today)){
      toCharge.push({
        "user_id": data[i].user_id,
        "subscription_id": data[i].subscription_id,
        "amount": data[i].amount,
        "currency": data[i].currency
      })
    }
  }

  for (let i = 0; i < toCharge.length; i++) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: toCharge[i].user_id,
        amount: toCharge[i].amount,
        currency: toCharge[i].currency,
        transaction_type: 3,
        transaction_status: 1
      })
  }


  return toCharge
});