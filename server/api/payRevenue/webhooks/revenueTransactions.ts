import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const query = getQuery(event)
  const topic = 'revenueTransactions';
  const service = 'payRevenue';
  const body = await readBody(event)

  messaging.read(supabase, topic, service, body.record.message_id);

  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);

  const getSharesPerUser = async () => {
    const { data, error } = await supabase
      .from('pay_revenue')
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
      .from('account_transactions')
      .insert(json)
    if(data) return data
    if(error) {
      ok.log('error', 'could not create transaction for'+json.user_id, error)
      return error
    }
  }
  const sharesPerUser = await getSharesPerUser();
  const totalShares = await getTotalShares(sharesPerUser);

  for (let i = 0; i < sharesPerUser.length; i++) {
    // check that user_id, amount etc is correct
    const user = sharesPerUser[i].user_id;
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
      'message_id': ok.uuid(),
      'message_entity_id': ok.uuid(),
      'message_sender': 'server/api/payRevenue/_revenueTransactions.ts',
      'user_id': user,
      'amount': dividend,
      'transaction_type': 'deposit',
      'transaction_sub_type': 'dividend',
      'transaction_status': 'payment_accepted',
      'currency': 'EUR'
    };

    if(!json.amount) {
      ok.log('error', 'no shares for user: ', sharesPerUser[i].user_id)
      return 'error: no shares for user:'
    }
    const created = await createDividendTransactions(json);
    ok.log('success', 'dividend transaction created: ', json)
  }
  // we need to take into account exchange rates!!!!
  return message
});