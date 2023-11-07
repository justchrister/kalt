import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'autoDivest';
  const topic = 'accountTransactions';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';
  
  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);
  if(message.status!=='pending') {
    return 'wrong payment status'
  }
  if (message.autoVest === 0 || message.autoVest === null || message.autoVest === undefined) {
    return 'autoVest is 0 or undefined';
  }
  if (message.subtype === 'autoInvested') {
    return 'already autoDivested';
  }
  if (message.type !== 'withdraw') {
    return 'not a withdrawal';
  }

  const doesItRequireDivesting = async () => {
    const user = await get(supabase).user(message.userId);
    const accountBalance = await get(supabase).accountBalance(user);
    const accountBalanceFloat = ok.toFloat(accountBalance);
    const check = accountBalanceFloat + message.amount;
    if(check>=0) {
      return false
    } else {
      return check
    }
  }
  const requiresDivesting = await doesItRequireDivesting();
  if(requiresDivesting===false) {
    // set to auto invest 0
    return await pub(supabase, {
      sender:'server/api/autoDivest/index.ts',
      entity: message.message_entity
    }).accountTransactions({
      userId: message.userId,
      autoVest: 0
    });
  } else {
    // get the user fund
    // create sell orders for all of them
    // set autoVest to 0
    // let it start a withdrawal
    return 'hey'
  }
});
