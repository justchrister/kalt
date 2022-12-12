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
  console.log(req)
})


export default app;
