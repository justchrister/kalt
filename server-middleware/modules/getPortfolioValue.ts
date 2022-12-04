import {default as cors, default as express} from 'express'
import { createClient } from '@supabase/supabase-js'
import Joi from 'joi'

const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw");

const app = express()
app.use(cors())
app.use(express.json())

var corsWhitelist = ['http://kalt.co', 'http://poc.kalt.co']
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}

// Validate the schema
const validateSchema = request => {
  const schema = Joi.object({
    user_id: Joi.string().min(3).required(),
    order_type: Joi.number().integer(), // 0 = buy, 1=sell
    ticker: Joi.string().min(3).required(), // DDF_Global_Index for instance
    quantity: Joi.number().integer().required(),
  })
  return schema.validate(request)
}

app.post('/createOrder', cors(corsOptions), async (req, res) => {
  // check for validation against order schema
  const {error} = validateSchema(req.body)

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
export default app;
