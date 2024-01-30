import { ok } from '~/composables/ok'

export const getExchangeRates = async (client, from, to) => {
  if (from === to) return 1;
  const { data, error } = await client
    .from('topic_exchangeRates')
    .select()
    .eq('from', from)
    .eq('to', to)
    .order('timestamp', { ascending: true })
    .limit(1)
    .single()
  if (error) {
    ok.log('warn', 'could not get exchange rates')
    return null
  } else {
    return data.rate
  }
};