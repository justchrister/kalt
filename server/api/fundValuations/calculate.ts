import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const getTotalShares = async () => {
    const { data, error } = await supabase
      .from('topic_exchangeOrders')
      .select()
      .eq('orderStatus', 'fulfilled')
      .eq('ticker', 'gi.ddf')
      .eq('order_type', 'buy')
    let total = 0;
    if(data){
      for (let i = 0; i < data.length; i++) {
        const order = data[i];
        total += order.quantity;
      }
      ok.log('success', 'got total shares: '+total)
      return total
    }
    if(error){
      ok.log('error', 'error getting fulfilled orders: '+error.message)
      return error
    }
  }
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let month = '' + (date.getUTCMonth() + 1);
    let day = '' + date.getUTCDate();
    let year = date.getUTCFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  const getTrailingAverageForecast = async () => {
    const { data, error } = await supabase
      .from('topic_revenueTransactions')
      .select()
      .eq('ticker', 'gi.ddf')
    let groupedData = {};
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const date = formatDate(data[i].message_sent);
      if (!groupedData[date]) {
        groupedData[date] = 0;
      }
      groupedData[date] += data[i].amount;
      total += data[i].amount;
    }
    let average = total/Object.keys(groupedData).length;
    return {
      "average": average,
      "total": total,
      "daily": groupedData
    }
  }
  const getForecastedAnnualCashFlow = async () => {
    // will be extended
    const dailyForecast = await getTrailingAverageForecast();
    const annualForecast = dailyForecast.average*365;
    return annualForecast;
  }

  const totalShares = await getTotalShares() || 0 as any;

  const annualCashFlow = await getForecastedAnnualCashFlow();
  const operatingCost = annualCashFlow*0.04;
  const presentValue = annualCashFlow - operatingCost;
  const discountRate = 0.8;
  const premiumRate = 0.1; 
  const growthRate = 0.02;

  const totalValuation = presentValue / (discountRate - premiumRate - growthRate)
  const shareValuation = totalValuation/totalShares
  
  const json = {
    "ticker": "ddf.gi",
    "totalValuation": totalValuation,
    "totalShares": totalShares,
    "shareValuation": shareValuation
  }

  await pub(supabase, 'fundValuation', { 'messageSender': 'server/api/fundValuation/calculate.ts' }, json)
  return json
});