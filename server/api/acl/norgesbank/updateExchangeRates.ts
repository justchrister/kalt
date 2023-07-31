import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messagingNext';
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
      }
    }
    return pairs;
  }
  const getRate = async (iso) => {
    if(iso=='NOK') return 1;
    const { data, error} = await ok.fetch('get', 'https://data.norges-bank.no/api/data/EXR/B.'+iso+'.NOK.SP?format=sdmx-json&lastNObservations=1&locale=no')
    if(error) {
      ok.log('error', 'could not get rate for '+iso, error.message)
      return null
    }
    if(data){
      return data.data.dataSets[0].series["0:0:0:0"].observations["0"][0]
    }
  }
  const updateRate = async (pair) => {
    const fromRate = await getRate(pair.from);
    const toRate = await getRate(pair.to);
    const rate = (fromRate/toRate) || 1;
    if(!fromRate) return;
    if(!toRate) return;
    const { error, data } = await pub(supabase, {sender:'server/api/acl/updateExchangeRates.ts'}).exchangeRates({
      from: pair.from,
      to: pair.to,
      rate: rate
    });
    if(data){
      ok.log('', 'updated exchange rate '+pair.from+' → '+pair.to+' to '+rate)
      return data
    }
    if(error){
      ok.log('', 'error: ', error)
    }
  }
  const currencies = await getCurrencies()
  const currencyPairs = await createCurrencyPairs(currencies)
  let updatedValues = [];
  for (let i = 0; i < currencyPairs.length; i++) {
    const pair = currencyPairs[i];
    let updatedRate = await updateRate(pair)
    updatedValues.push(...updatedRate)
  }
  return updatedValues
});