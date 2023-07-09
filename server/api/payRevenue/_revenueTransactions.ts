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
    return data
  }

  const getTotalShares = async (userList) => {
    let totalShares = 0;
    for (let i = 0; i < userList; i++) {
      const user = userList[i];
      totalShares += user.quantity;
    }
    return totalShares;
  }

  const createDividendTransactions = async () => {
  }
  const sharesPerUser = await getSharesPerUser();
  const totalShares = await getTotalShares(sharesPerUser);

  for (let i = 0; i < sharesPerUser.length; i++) {

    const user = sharesPerUser[i].user_id;
    const shares = sharesPerUser[i].quantity;
    const share = shares / totalShares;
    const dividend = message.dividend * share;

    const json = {
      'user_id': user.id,
      'currency': message.ticker,
      'quantity_change': 0
    };
    ok.log('success', 'did it!:', json)
  }
  // get shares per user
  // create transaction to each user
  // voila!
  

  console.log(message)
  return message  
  if(data) return data
  if(error) return error
});