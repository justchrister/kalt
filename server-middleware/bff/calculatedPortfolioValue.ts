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
  const { data: input, error } = await supabase
    .from('exchange')
    .select('*')
    .is('fulfilled_by_order_id', null)
    .eq('user_id', req.headers.user_id)
    const today = new Date();
    const dates = [];

    // Create n dates backwards from today
    const n = 4;
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    // Create a dataset object with the dates and corresponding amounts
    const dataset = input.reduce((acc, curr) => {
      const date = curr.created_at.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.order_type === 0 ? curr.quantity : -curr.quantity;
      return acc;
    }, {});

    // Accumulate the amounts for each date
    let accumulatedAmount = 0;
    for (const date in dataset) {
      accumulatedAmount += dataset[date];
      dataset[date] = accumulatedAmount;
    }

    // Add empty days for the missing dates
    let previousValue = 0;
    const output = dates.reduce((acc, curr) => {
      previousValue = dataset[curr] ? dataset[curr] : previousValue;
      acc.push({
        date: curr,
        value: previousValue
      });
      return acc;
    }, []);

    console.log(output);
    if(req.query.days) return res.json(output)
    if(req.query.months) return res.json(output)
    if (error) return res.status(400).json({message: 'Error getting all ordres'})
});

export default app;
