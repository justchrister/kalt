import { ok } from '~/composables/ok'

export const getAccountBalance = async (client, user) => {
  const { data, error } = await client
    .from('topic_transactions')
    .select()
    .eq('userId', user.id)
    .order('timestamp', { ascending: true })
  const merged = ok.merge(data, 'id');
  ok.log('', merged)
  if (error) {
    ok.log('warn', error)
    return ok.formatCurrency(0, user.currency)
  } else {
    const filtered = merged.filter(message => (message.type === 'deposit' && message.status === 'complete') || (message.type === 'withdraw' && (message.status === 'complete' || message.status === 'pending')));
    const result = filtered.reduce((acc, message) => acc + message.amount, 0);
    return ok.formatCurrency(result, user.currency)
  }
};