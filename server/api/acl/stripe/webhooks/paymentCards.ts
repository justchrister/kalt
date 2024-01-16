import Stripe from 'stripe';
import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { pub, sub } from '~/composables/messaging';
import { cryptography } from '~/composables/cryptography';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  ok.log('', event.node.req.headers)
  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event);
  const service = 'aclStripe';
  const topic = 'cards';
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.id);
  await sub(supabase, topic).read(service, body.record.event);  
  const key = await get(supabase).key(message.userId);
  
  const decryptedNumber = await cryptography.decrypt(key, {
    'iv': message.numberIv,
    'content': message.number
  });
  const json = {
    'id': message.id,
    'userId': message.userId,
    'number': decryptedNumber,
    'month': message.month,
    'year': message.year,
    'cvc': message.cvc
  } as any;
  const checkIfUserExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe')
      .select()
      .eq('userId', message.userId)
      .limit(1)
      .single()
    if(error){
      ok.log('error', 'could not check if user exists: '+ error.message)
      return false
    } else if(data) {
      ok.log('', 'user exists: '+data.stripeUserId)
      return data
    } else {
      ok.log('', 'user does not exist ')
      return false
    }
  }
  const addCard = async () => {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: json.number,
        exp_month: json.month,
        exp_year: json.year,
        cvc: json.cvc
      },
      metadata: {
        cardId: json.cardId,
        userId: json.userId
      }
    });
    return paymentMethod;
  }
  const attachCard = async (customerId: any, cardId: any) => {
    const card = await stripe.paymentMethods.attach(
      cardId,
      {
        customer: customerId
      }
    );
    ok.log('success', 'attached card', card);
    return card
  }
  const makeCardDefault = async (customerId: any, cardId: any) => {
    const customer = await stripe.customers.update(
      customerId,
      {invoice_settings: {default_payment_method: cardId}}
    );
    const { data, error } = await supabase
      .from('acl_stripe')
      .upsert({
        userId: json.userId,
        stripeCardId: cardId
      })
      .select()
    if(data){
      ok.log('success', 'updated default card', data)
    }
    if(error){
      ok.log('error', 'failed to update default card', error)
    }
    ok.log('success', 'updated customer', customer);
    return customer
  }
  const checkIfCardExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe')
      .select()
      .eq('stripeCardId', message.stripeCardId)
      .limit(1)
      .single()
    if(data) return data.stripeCardId
    else return false
  }

  const userExists = await checkIfUserExists();
  const cardExists = await checkIfCardExists();

  if(!userExists) return 'user does not exist';
  if(userExists && cardExists && message.default){
    const defaultCard = await makeCardDefault(userExists.stripeUserId, cardExists.stripeCardId);
    return defaultCard;
  }
  if(userExists){
    const createdCard = await addCard();
    const attachedCard = await attachCard(userExists.stripeUserId, createdCard.id);
    if(message.default) {
      const defaultCard = await makeCardDefault(userExists.stripeUserId, createdCard.id);
    }
    return attachedCard;
  }
  return 'idk this if shit is getting complicated. Needs to be refactored';
}); 