import { ok } from '~/composables/ok'

export const getLinkedBankAccount = async (client, user) => {

  const { data, error } = await client
    .from('topic_linkedBankAccounts')
    .select()
    .eq('userId', user.id)
    .order('timestamp', { ascending: true })
  if (error || data.length === 0 || !data) {
    return null
  } else {
    return ok.merge(data, 'id')[0];
  }
};