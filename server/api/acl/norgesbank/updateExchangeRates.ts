import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  
  const getCurrencies = async () => {
    let currencies = []
    const { data, error } = await supabase
      .from('currencies')
      .select()
      .eq('enabled', true)
    if(error) ok.log('error', 'could not get currencies', error.message )
    if(data) {
      for (let i = 0; i < data.length; i++) {
        const currency = data[i];
        currencies.push(currency.iso)
      }
    }
    ok.log('', 'got the currencies', data)
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
    ok.log('', 'made them into pairs ', pairs)
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
    const json = {
      'from': pair.from,
      'to': pair.to,
      'value': rate
    };
    if(!fromRate) return;
    if(!toRate) return;
    const { data, error } = await supabase
      .from('exchange_rates')
      .upsert(json)
      .select()
    if(data){
      ok.log('', 'data: ', data)
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
    ok.log('', 'im here 1')
    const pair = currencyPairs[i];
    let updatedRate = await updateRate(pair)
    updatedValues.push(...updatedRate)
  }
  return updatedValues
});