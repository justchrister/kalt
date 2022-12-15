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

  const getOrder = async (type) => {
    const { data, error } = await supabase
      .from('exchange')
      .select('order_id')
      .is('fulfilled_by_order_id', null)
      .eq('order_type', type)
      .eq('quantity', 1)
      .order('created_at', { ascending: true })
    return data[0].order_id
  }

  const updateOrder = async (order, fulfiller) => {
    const { error } = await supabase
      .from('exchange')
      .update({ fulfilled_by_order_id: fulfiller })
      .eq('order_id', order)
  }

  let sell_id = await getOrder(0)
  let buy_id  = await getOrder(1)
  await updateOrder(sell_id, buy_id)
  await updateOrder(buy_id, sell_id)

  return res.json(buy_id)
})


export default app;
