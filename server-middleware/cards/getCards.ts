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

const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g")

app.get('/getCards', cors(corsOptions), async (req, res) => {
  const {data, error} = await supabase.from('cards').select('*').eq('user_id', req.query.user_id)
  if (error) return res.status(404).json({message: 'No cards on record'})
  if (data) return res.json(data)
});

export default app;
