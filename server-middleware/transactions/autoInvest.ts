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

// Validate the schema
const validateTransactionchema = request => {
  const schema = Joi.object({
    user_id: Joi.string().min(3).required(),
    transaction_type: Joi.number().integer(), // 0 = buy, 1=sell
    amount: Joi.number().integer(), // 0 = buy, 1=sell
    currency: Joi.string().min(3).required(), // DDF_Global_Index for instance
  })
  return schema.validate(request)
}

app.post('/autoInvest', cors(corsOptions), async (req, res) => {
  const {data, error} = await supabase.from('transactions').select('*').eq('user_id', req.body.record.user_id) 
  let sum=0;
  for (let i = 0; i < data.length; i++) {
    if(data[i].transaction_type===0) sum += data[i].amount
    if(data[i].transaction_type===1) sum -= data[i].amount
  }
  let buyAmount = Math.floor(sum/100); // divided by 100 since it is in NOK and each DDS is worth 100 NOK
  if (buyAmount>1){
    // insert order object into supabase d
    const {data: orderCreated} = await supabase.from('exchange').insert([
      {
        user_id: req.body.record.user_id,
        order_type: 1,
        ticker: "DDS_Global_Index",
        quantity: buyAmount,
        created_at: new Date
      },
    ])

    // insert order object into supabase db
    const {data: transactionCreated} = await supabase.from('transactions').insert([
      {
        user_id: req.body.record.user_id,
        transaction_type: 1,
        amount: buyAmount*100,
        currency: "NOK",
        created_at: new Date
      },
    ])
    console.log(orderCreated)
    console.log(transactionCreated)
    
  }
  if (error) return res.status(400).json({message: 'Error getting transactions'})
  if (data) return res.json(sum)
})


export default app;
