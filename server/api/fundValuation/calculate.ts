import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const getTotalShares = async () => {
    return 1010
    // here we need to get and sum all shares active in the exchange (fulfilled buy orders, and unfulfilled sell orders)
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
      .from('revenue_transactions')
      .select()
      .eq('ticker', 'gi.ddf')
    let groupedData = {};
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const date = formatDate(data[i].message_created);
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
    const dailyForecast = await getTrailingAverageForecast();
    const annualForecast = dailyForecast.average*365;
    return annualForecast;
  }

  const totalShares = await getTotalShares();

  const annualCashFlow = await getForecastedAnnualCashFlow();
  const operatingCost = annualCashFlow*0.04;
  const presentValue = annualCashFlow - operatingCost;
  const discountRate = 0.8; // 
  const premiumRate = 0.1; 
  const growthRate = 0.02; // annual growthRate projection

  const totalValuation = presentValue / (discountRate - premiumRate - growthRate)
  const shareValuation = totalValuation/totalShares
  return {
    "ticker": "ddf.gi",
    "totalValuation": totalValuation,
    "shareValuation": shareValuation
  }
});