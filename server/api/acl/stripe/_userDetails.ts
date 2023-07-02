import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const topic = 'userDetails';
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity_id
  );
  await messaging.read(supabase, topic, service, body.record.message_id);  
  ok.log('','user id: '+message.user_id);

  const createUser = async () => {
    const user = await stripe.customers.create({
      email: message.email,
      name: message.first_name+' '+message.last_name
    });
    if (user) return user;
    ok.log('succes', 'created user: '+user)
  };
  const assignStripeId = async (userId, stripeUserId) => {
    const { data, error } = await supabase
      .from('acl_stripe_user_ids')
      .insert({
        "user_id": userId,
        "stripe_user_id": stripeUserId
      })
      .select()
    ok.log('success', 'assigned stripe id: '+data)
    return data
  }
  // do api call to Stripe
  const createdUser = await createUser();

  // post new message containing user id in stripe
  // add to a table that is user ids (acl_stripe_user_ids)
  if (createdUser) await assignStripeId(message.user_id, createdUser.id);
});