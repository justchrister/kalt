import dotenv from 'dotenv'
import {default as cors, default as express} from 'express'
import Joi from 'joi'
import { createClient } from '@supabase/supabase-js'

const devPort = 443
const app = express()

app.use(cors())
app.use(express.json())
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}
const validateOrderSchema = request => {
  // book schema
  const schema = Joi.object({
    user_id: Joi.string().min(3).required(),
    order_type: Joi.number().integer(), // 0 = buy, 1=sell
    ticker: Joi.string().min(3).required(), // DDF_Global_Index for instance
    quantity: Joi.number().integer().required(),
  })
  return schema.validate(request)
}

const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw")


// get all orders
app.get('/api/exchange/getOrders', cors(corsOptions), async (req, res) => {
  const {data, error} = await supabase.from('exchange').select('*')
  if (error) return res.status(400).json({message: 'Error getting all ordres'})
  if (data) return res.json(data)
})

// Create order
app.post('/api/exchange/createOrder', cors(corsOptions), async (req, res) => {
  // check for validation against order schema
  const {error} = validateOrderSchema(req.body)

  // check for validation if no validation return 400
  if (error) {
    return res.status(400).json({message: `${error.details[0].message}`})
  }

  // insert order object into supabase db
  const {data} = await supabase.from('exchange').insert([
    {
      user_id: req.body.user_id,
      order_type: req.body.order_type,
      ticker: req.body.ticker,
      quantity: req.body.quantity,
      created_at: new Date
    },
  ])

  // return valid book object back to client
  if (data) res.json(data)
})

// match two unfulfilled orders
app.put('/api/exchange/matchOrders', cors(corsOptions), async (req, res) => {

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

app.listen(devPort, () => {
  console.log('Exchange Service is now running')
})
