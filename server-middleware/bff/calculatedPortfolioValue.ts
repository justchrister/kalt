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
app.get('/calculatedPortfolioValue', cors(corsOptions), async (req, res) => {
  const supabase = createClient(req.headers.url, req.headers.token)
  const { data: orders, error } = await supabase
    .from('exchange')
    .select('*')
    .is('fulfilled_by_order_id', null)
    .eq('user_id', req.headers.user_id)
  if (error) return res.status(400).json({message: 'Error getting all ordres'})
  if (orders){
    var sum = 0;
    for (var i in orders){
      var quantity=orders[i].quantity;
      var type=orders[i].order_type
      if (type===0) sum += quantity
      if (type===1) sum -= quantity
    }
    return res.json(sum)
  } 
});

export default app;
