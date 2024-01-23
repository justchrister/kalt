import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { sub, pub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const supabase = serverSupabaseServiceRole(event);
  const topic = 'users';
  const service = 'aclStripe';
  const stripeSecret = process.env.STRIPE_SECRET_KEY as string;
  const body = await readBody(event);
  const stripe = new Stripe(stripeSecret, ''); // your stripe key here
  if (body.record.read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.id);
  await sub(supabase, topic).read(service, body.record.event);

  const user = await get(supabase).user(message.id) as user;

  const createUser = async (user) => {
    const stripeUser = await stripe.customers.create({
      email: user.email,
      name: user.firstName+' '+user.lastName,
      metadata: { 
        userId: message.id
      }
    });
    if (stripeUser) {
      ok.log('succes', 'created user:', stripeUser)
      return stripeUser;
    } else {
      ok.log('error', 'could not create user')
      return;
    }
  };

  const assignStripeId = async (userId: string, paymentProviderId: string) => {
      await pub(supabase, {
        sender: 'server/api/acl/stripe/webhooks/users',
        id: userId
      }).users({
        paymentProviderId
      });
  }

  const updateStripeUser = async (user: user) => {
    const updatedUser = await stripe.customers.update(
      user.paymentProviderId, {
        name: user.firstName+' '+user.lastName,
      }
    );
    return updatedUser
  }

  if(user.paymentProviderId) {
    const updatedUser = await updateStripeUser(user);
    return updatedUser
  } else {
    const createdUser = await createUser(user);
    if (createdUser) await assignStripeId(user.id, createdUser.id);
    return "successfully assigned internal userId with stripe userId"
  }
});