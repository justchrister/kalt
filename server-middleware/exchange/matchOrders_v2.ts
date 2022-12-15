import {default as cors, default as express} from 'express'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw");

const app = express()
app.use(cors())
app.use(express.json())
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}

app.post('/matchOrders', cors(corsOptions), async (req, res) => {

  const getFulfillingOrder = async (fulfiller_type, req_order_user_id, req_order_order_id, req_order_quantity) => {
    const { data, error } = await supabase
      .from('exchange')
      .select('*')
      .is('fulfilled_by_order_id', null)
      .eq('order_type', fulfiller_type)
      .neq('user_id', req_order_user_id)   //  Without these two rows, it will be matched with itself :)
      .neq('order_id', req_order_order_id) //    ^
      .gte('quantity', req_order_quantity)
      .order('created_at', { ascending: true })
      .limit(1)
    if (data) return data
    if (error) return error
  }
  
  const updateOrder = async (order, fulfiller) => {
    const { } = await supabase.from('exchange').update({ fulfilled_by_order_id: fulfiller }).eq('order_id', order)
    const { } = await supabase.from('exchange').update({ fulfilled_by_order_id: order }).eq('order_id', fulfiller)
  }
  
  const createOrder = async (user_id, order_type, quantity) => {
    const {data} = await supabase.from('exchange').insert([
      {
        user_id: user_id,
        order_type: order_type,
        ticker: "DDF_Global_Index",
        quantity: quantity,
        created_at: new Date
      },
    ])
  }

  let req_order          = req.body.record
  let req_order_user_id  = req_order.user_id
  let req_order_order_id = req_order.order_id
  let req_order_quantity = req_order.quantity
  let fulfiller_type     = 1
  if(req.body.record.order_type===1) fulfiller_type = 0

  let fulfiller  = await getFulfillingOrder(fulfiller_type, req_order_user_id, req_order_order_id, req_order_quantity)
  // if we need to split it: 
  
  let fulfiller_quantity = fulfiller[0].quantity
  let fulfiller_order_id = fulfiller[0].order_id
  let fulfiller_user_id  = fulfiller[0].user_id
  let new_order_quantity = fulfiller_quantity - req_order_quantity;
  
  if (fulfiller_quantity=req_order_quantity && fulfiller[0]){
    await updateOrder(fulfiller_order_id, req_order_order_id)
    return res.json("order matched")
  }
  if(fulfiller_quantity>req_order_quantity && fulfiller[0]){
    await createOrder(fulfiller_user_id, fulfiller_type, new_order_quantity) 
    await updateOrder(fulfiller_order_id, req_order_order_id)
    return res.json("order matched")
  }
  return res.json("no matches made")
})

export default app;
