import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const getCurrencies = async () => {
    let currencies = []
    const { data, error } = await supabase
      .from('sys_currencies')
      .select()
      .eq('enabled', true)
    if(error) ok.log('error', 'could not get currencies', error.message )
    if(data) {
      for (let i = 0; i < data.length; i++) {
        const currency = data[i];
        currencies.push(currency.iso)
      }
    }
    ok.log('', 'got the currencies', currencies)
    return currencies
  }

  const createCurrencyPairs = (currencies) => {
    let pairs = [];
    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        pairs.push({
          from: currencies[i], 
          to: currencies[j], 
          value: null
        });
        ok.log('', 'created the currency pair '+currencies[i]+' → '+currencies[j])
      }
    }
    return pairs;
  }
  const getRate = async (iso) => {
    if(iso=='NOK') return 1;
    ok.log('', 'getting exchange rate for '+iso)
    const { data, error} = await ok.fetch('get', 'https://data.norges-bank.no/api/data/EXR/B.'+iso+'.NOK.SP?format=sdmx-json&lastNObservations=1&locale=no')
    if(error) {
      ok.log('error', 'could not get rate for '+iso)
      return null
    }
    if(data){
      ok.log('success', 'got the rate for '+iso+': '+data.data.dataSets[0].series["0:0:0:0"].observations["0"][0])
      return data.data.dataSets[0].series["0:0:0:0"].observations["0"][0]
    }
  }
  const updateRate = async (pair) => {
    if(pair.from==pair.to) return null;
    const fromRate = await getRate(pair.from);
    const toRate = await getRate(pair.to);
    const rate = (fromRate/toRate) || 1;
    if(!fromRate) return null;
    if(!toRate) return null;
    const { error } = await pub(supabase, {
      sender:'server/api/acl/updateExchangeRates.ts'
    }).exchangeRates({
      from: pair.from,
      to: pair.to,
      rate: rate
    });
    if(error){
      ok.log('', 'error: ', error)
    } else {
      ok.log('', 'updated exchange rate '+pair.from+' → '+pair.to+' to '+rate)
      return {
        'from': pair.from,
        'to': pair.to,
        'rate': rate
      }
    }
  }
  const currencies = await getCurrencies()
  const currencyPairs = await createCurrencyPairs(currencies)
  
  for (let i = 0; i < currencyPairs.length; i++) {
    await updateRate(currencyPairs[i])
  }
  return 'updatedValues'
});