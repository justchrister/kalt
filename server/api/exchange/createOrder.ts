import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const query = getQuery(event)
  const body = await readBody(event)

  const {data: transaction_incomplete } = await supabase
    .from('transactions')
    .select('*')
    .is('exchange_order', null)
    .eq('transaction_id', body.record.transaction_id)
    .eq('transaction_status', 1) // when we have stripe integration, this should be set to 2 when transaction is completed
    .single()
  const {data:exchange_rates } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('iso', body.record.currency)
    .single()

  // insert order object into supabase db
  const createOrder = async () => { 
    const {data, error} = await supabase.from('exchange').insert([
      {
        user_id: transaction_incomplete.user_id,
        order_type: transaction_incomplete.transction_type,
        ticker: "DDFGI",
        quantity: transaction_incomplete.amount * exchange_rates.eq_ddfgi,
        created_at: new Date
      },
    ]).select().single()
    return data
  }

  // create order and update the 
  if (transaction_incomplete){
    const order = await createOrder()
    const { error } = await supabase
      .from('transactions')
      .update({
        transaction_id: transaction_incomplete.transaction_id,
        exchange_order: order.order_id,
        transaction_status: 3
      })
    return {
      'order_created': order.order_id
    }
  }
  });