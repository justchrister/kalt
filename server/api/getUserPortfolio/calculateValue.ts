//@ts-nocheck
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  if(body.record.value!==body.old_record.value) return "No change in quantity_today"

  const assetPrice = await messaging.getAssetPrice(supabase, body.record.value_currency, body.record.ticker)

  const valueCalculated = body.record.quantity_today/assetPrice;
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update({"value": valueCalculated})
    .eq('date', body.record.date)
    .eq('ticker', body.record.ticker)
    .eq('user_id', body.record.user_id)
    .select()
  return data
});