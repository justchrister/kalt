import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messagingNext'
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

  const createDividendTransactions = async (json) => {
    const { data, error } = await supabase
      .from('topic_accountTransactions')
      .insert(json)
    if(data) return data
    if(error) {
      ok.log('error', 'could not create transaction for'+json.userId, error)
      return error
    }
  }
  const sharesPerUser = await getSharesPerUser();
  const totalShares = await getTotalShares(sharesPerUser);

  for (let i = 0; i < sharesPerUser.length; i++) {
    // check that userId, amount etc is correct
    const user = sharesPerUser[i].userId;
    const shares = sharesPerUser[i].quantity;
    const share = shares / totalShares;
    const dividend = message.amount * share;
    ok.log('', {
      "user": user,
      "shares": shares,
      "totalShares": totalShares,
      "totalAmount": message.amount,
      "share": share,
      "dividend": dividend
    })
    const json = {
      'message_sender': 'server/api/payRevenue/webhooks/revenueTransactions.ts',
      'userId': user,
      'amount': dividend,
      'type': 'deposit',
      'subType': 'dividend',
      'status': 'complete',
      'currency': 'EUR'
    };

    if(!json.amount) {
      ok.log('error', 'no shares for user: ', sharesPerUser[i].userId)
      return 'error: no shares for user:'
    }
    const created = await createDividendTransactions(json);
    ok.log('success', 'dividend transaction created: ', json)
  }
  // we need to take into account exchange rates!!!!
  return message
});