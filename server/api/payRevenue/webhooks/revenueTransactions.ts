import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const topic = 'revenueTransactions';
  const service = 'payRevenue';
  const body = await readBody(event)

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const getSharesPerUser = async () => {
    const { data, error } = await supabase
      .from('payRevenue')
      .select()
    if(data) {
      ok.log('success', 'got shares per user')
      return data
    }
    if(error){
      ok.log('error', 'error getting shares per user')
      return error
    }
  }

  const getTotalShares = async (userList) => {
    let totalShares = 0;
    for (let i = 0; i < userList.length; i++) {
      totalShares += userList[i].quantity;
    }
    return totalShares;
  }
  const sharesPerUser = await getSharesPerUser();
  const totalShares = await getTotalShares(sharesPerUser);

  for (let i = 0; i < sharesPerUser.length; i++) {
    // check that userId, amount etc is correct
    const user = sharesPerUser[i].userId;
    const shares = sharesPerUser[i].quantity;
    const share = shares / totalShares;
    const dividend = message.amount * share;
    if(!dividend) {
      ok.log('error', 'no shares for user: ', sharesPerUser[i].userId)
      return 'error: no shares for user:'
    }
    await pub(supabase, {sender:'server/api/payRevenue/webhooks/revenueTransactions.ts'}).accountTransactions({
      'userId': user,
      'amount': dividend,
      'type': 'deposit',
      'subType': 'dividend',
      'status': 'complete',
      'currency': 'EUR'
    });
  }
  // we need to take into account exchange rates!!!!
  return message
});