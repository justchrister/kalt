import dotenv from 'dotenv'
import Joi from 'joi'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const query = getQuery(event)

  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw")
  const { data: input, error } = await supabase
    .from('exchange')
    .select('order_id, order_type, quantity, created_at')
    .eq('user_id', query.user_id)
    .not('fulfilled_by_order_id', 'is', null );
    const today = new Date();
    const dates = [];
    console.log(input)

    // Create n dates backwards from today
    const n = 365*6;
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
    const output = dates.reduce((acc, curr) => {
      acc.push({
        date: curr,
        amount: dataset[curr] ? dataset[curr] : null
      });
      return acc;
    }, []);

    // Sort the array in ascending order by date
    const sortedInput = output.sort((a, b) => {
      // Parse the date strings into JavaScript Date objects
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Compare the dates and return the appropriate value
      // according to the sort criteria
      if (dateA < dateB) {
          return -1;
      } else if (dateA > dateB) {
          return 1;
      } else {
          return 0;
      }
    });
    // Sort the array by date    
    let previousValue = null;
    const sortedOutput = sortedInput.map(item => {
        if (item.amount === null) {
            item.amount = previousValue;
        } else {
            previousValue = item.amount;
        }
        return item;
    });
    // Reverse it, and choose the last X days based on the ?days= url parameter
    let filtered = "sorry"
    if(input.length>0) filtered = sortedOutput.reverse().slice(0, query.days);
  return {
    api: filtered
  }
})