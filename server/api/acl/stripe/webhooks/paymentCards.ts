import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'aclStripe';
  const topic = 'paymentCards';
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  const json = {
    'userId': message.userId,
    'last_four_digits': message.lastFourDigits,
    'card_number': message.number,
    'cardId': message.cardId,
    'expiry_month': message.month,
    'expiry_year': message.year,
    'cvc': message.cvc
  } as any;

  const checkIfUserExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe_userIds')
      .select()
      .eq('userId', message.userId)
      .limit(1)
      .single()
    if(data) return data
    else return false
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
        card_id: json.cardId,
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
      .from('acl_stripe_defaultCardIds')
      .upsert({
        userId: json.userId,
        stripe_card_id: cardId
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
      .from('acl_stripe_cardIds')
      .select()
      .eq('cardId', message.card_id)
      .limit(1)
      .single()
    if(data) return data.stripe_cardId
    else return false
  }

  const userExists = await checkIfUserExists();
  const cardExists = await checkIfCardExists();

  if(!userExists) return 'user does not exist';
  if(userExists && cardExists && message.default){
    const defaultCard = await makeCardDefault(userExists.stripe_userId, cardExists.stripe_card_id);
    return defaultCard;
  }
  if(userExists){
    const createdCard = await addCard();
    const attachedCard = await attachCard(userExists.stripe_userId, createdCard.id);
    if(message.default) {
      const defaultCard = await makeCardDefault(userExists.stripe_userId, createdCard.id);
    }
    return attachedCard;
  }
  return 'idk this if shit is getting complicated. Needs to be refactored';
}); 