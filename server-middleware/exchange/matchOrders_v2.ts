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
  // Define ordertype
  if(req.body.record.order_type===0) var order_type = 0; var fulfiller_type = 1;
  if(req.body.record.order_type===1) var order_type = 1; var fulfiller_type = 0;

  const getFulfillingOrder = async (fulfiller_type, quantity) => {
    const { data, error } = await supabase
      .from('exchange')
      .select('*')
      .is('fulfilled_by_order_id', null)
      .eq('order_type', fulfiller_type)
      .neq('user_id', req.body.record.user_id)   //  Without these two rows, it will be matched with itself :)
      .neq('order_id', req.body.record.order_id) //    ^
      .gte('quantity', req.body.record.quantity)
      .order('created_at', { ascending: true })
    return data[0]
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
        quantity: quantity
      },
    ])
  }

  let fulfiller  = await getFulfillingOrder(fulfiller_type)

  if (fulfiller.quantity=req.body.record.quantity){
    await updateOrder(fulfiller.order_id, req.body.record.order_id) // update the fulfilled order
    return res.json("order_matched")
  }

  if(fulfiller.quantity>req.body.record.quantity){
    let newOrderQuantity = fulfiller.quantity - req.body.record.quantity;
    await createOrder(fulfiller.user_id, fulfiller_type, newOrderQuantity) // if the fulfiller quantity is bigger than the quantity, we need to split it, then match it (might only split it?)
    await updateOrder(fulfiller.order_id, req.body.record.order_id) // update the fulfilled order
    return res.json("order_matched")
  }
})


export default app;
