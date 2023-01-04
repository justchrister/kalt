import { createClient } from '@supabase/supabase-js'

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const query = getQuery(event)

  if (!query.user_id) return {'error': 'user_id not defined'} 
  if (!query.days) return {'error': 'days not defined'} 

    const { data: input, error } = await supabase
      .from('exchange')
      .select('order_id, order_type, quantity, created_at, modified_at')
      .eq('user_id', query.user_id)
      .not('fulfilled_by_order_id', 'is', null );

    // Create n dates backwards from today
    const n = query.days;
    const today = new Date();
    const output = [];
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i)
      const key = date.toISOString().split("T")[0]
      let dateObject = { [key] : null}
      output.push(dateObject)
      //dates.push(date.toISOString().split("T")[0]);
    }
    const keyval = input[0].modified_at.split("T")[0]



    input.forEach((item) => {
      const key = item['modified_at'];
      const value = item;
      output.forEach((firstArrayItem) => {
        if (firstArrayItem['date'] === key) {
          firstArrayItem['amount'] = value;
        }
      });
    });
    let output = input
    // Reverse it, and choose the last X days based on the ?days= url parameter
    return output;
})