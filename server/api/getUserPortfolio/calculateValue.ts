import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  if(body.record.quantity_today===body.old_record.quantity_today) return "No change in quantity_today"
  const assetPrice = await messaging.getAssetPrice(supabase, body.record.value_currency, body.record.ticker)
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update({"value": body.record.quantity_today/assetPrice})
    .eq('date', body.record.date)
    .eq('ticker', body.record.ticker)
    .eq('user_id', body.record.user_id)
    .select()
  return data
});