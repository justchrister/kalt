//@ts-nocheck
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const getUserCurrency = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('currency')
      .eq('user_id', body.record.user_id)
      .limit(1)
      .single();
    return data.currency;
  };
  const currency = await getUserCurrency();
  const assetPrice = await messaging.getAssetPrice(supabase, currency, body.record.ticker)
  const valueCalculated = body.record.quantity_today/assetPrice;
  const { data, error } = await supabase
    .from('get_user_portfolio')
    .update({
      'value': valueCalculated,
      'value_currency': currency
    })
    .eq('date', body.record.date)
    .eq('ticker', body.record.ticker)
    .eq('user_id', body.record.user_id)
    .select()
  return data
});