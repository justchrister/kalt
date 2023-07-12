import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'aclStripe';
  const topic = 'paymentCards';
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id);
  await messaging.read(supabase, topic, service, body.record.message_id);

  const json = await messaging.cleanMessage({
    'user_id': message.user_id,
    'last_four_digits': message.last_four_digits,
    'card_number': message.card_number,
    'card_id': message.card_id,
    'expiry_month': message.expiry_month,
    'expiry_year': message.expiry_year,
    'cvc': message.cvc
  });

  const checkIfUserExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe_user_ids')
      .select()
      .eq('user_id', message.user_id)
      .limit(1)
      .single()
    if(data) return data
    else return false
  }
  const addCard = async () => {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: json.card_number,
        exp_month: json.expiry_month,
        exp_year: json.expiry_year,
        cvc: json.cvc
      },
      metadata: {
        card_id: json.card_id,
        user_id: json.user_id
      }
    });
    return paymentMethod;
  }
  const attachCard = async (customerId, cardId) => {
    const card = await stripe.paymentMethods.attach(
      cardId,
      {
        customer: customerId
      }
    );
    ok.log('success', 'attached card', card);
    return card
  }
  const makeCardDefault = async (customerId, cardId) => {
    const customer = await stripe.customers.update(
      customerId,
      {invoice_settings: {default_payment_method: cardId}}
    );
    ok.log('success', 'updated customer', customer);
    return customer
  }
  const checkIfCardExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe_card_ids')
      .select()
      .eq('card_id', message.card_id)
      .limit(1)
      .single()
    if(data) return data.stripe_card_id
    else return false
  }

  const userExists = await checkIfUserExists();
  const cardExists = await checkIfCardExists();

  if(!userExists) return 'user does not exist';
  if(userExists && cardExists && message.default){
    const defaultCard = await makeCardDefault(userExists.stripe_user_id, cardExists.stripe_card_id);
    return defaultCard;
  }
  if(userExists){
    const createdCard = await addCard();
    const attachedCard = await attachCard(userExists.stripe_user_id, createdCard.id);
    if(message.default) {
      const defaultCard = await makeCardDefault(userExists.stripe_user_id, createdCard.id);
    }
    return attachedCard;
  }
  return 'idk this if shit is getting complicated. Needs to be refactored';
}); 