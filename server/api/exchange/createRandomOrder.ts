import { oklog } from '~/composables/oklog'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  const user_ids = [
    'ab2b5dd7-d9a9-4b07-831c-f03c268b13cd',
    '5aa6e520-9717-457a-9daf-82b90f4973db',
    '7263b43e-2bec-484c-b9c6-68ab4e81494e',
    '9703d3f3-e8cc-44e8-981c-efbbeb6f5788',
    '00de9139-8483-4c38-900a-dc389f6c7f56',
    '1b90459d-20e7-46ec-933f-c21390dd4af3',
    'a631c34d-f345-4c74-8e48-100a393849a9',
    'd0820190-da5a-43ad-919b-a22e61044be6'
  ]
  function rndm(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const order_type = 0;
  const quantity = rndm(1, 60);
  const user_id = user_ids[Math.floor(Math.random() * user_ids.length)];
  // insert order object into supabase db
  const {data, error} = await supabase.from('exchange').insert([
    {
      user_id: user_id,
      order_type: order_type,
      ticker: 'DDFGI',
      quantity: quantity,
      created_at: new Date
    },
  ]).select('order_id,user_id,order_type,ticker,quantity').single()
  return data
});