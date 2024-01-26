import { ok } from '~/composables/ok';
import { get } from '~/composables/get';
import { sub, pub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {

  const keyPair = await ok.verifyKeyPair(event)
  if(!keyPair) return 'unauthorized'

  const topic = 'users';
  const service = 'aclStripe';

  const supabase = serverSupabaseServiceRole(event);
  const stripeSecret = process.env.STRIPE_SECRET_KEY as string;
  const stripe = new Stripe(stripeSecret, ''); // your stripe key here
  
  const body = await readBody(event);
  if (body.record.read) return 'message already read';

  const message = await sub(supabase, topic).message(body.record.id);
  await sub(supabase, topic).read(service, body.record.event);
  if(message.sender==='server/api/acl/stripe/webhooks/users') return 'message from self';

  const user = await get(supabase).user(message.id) as user;
  
  if(!user) return 'could not find user'
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

  const updateUser = async (userId: string, paymentProviderId: string) => {
    await pub(supabase, {
      sender: 'server/api/acl/stripe/webhooks/users',
      id: userId
    }).users({
      paymentProviderId
    });
  }

  const updateStripeUser = async (user: user) => {
    return await stripe.customers.update(
      user.paymentProviderId, {
        name: user.firstName+' '+user.lastName,
      }
    );
  }
  const createSetupIntent = async (customerID: string) => {
    return await stripe.setupIntents.create({
      customer: customerID,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true
      },
      payment_method_configuration: 'pmc_1M6g5zDBFB40Q48wehke7ZMD'
    });
  }

  if(user.paymentProviderId) {
    if(message.firstName || message.lastName) {
      const updatedUser = await updateStripeUser(user);
      return updatedUser
    }
    return 'user already exists, and no change in customer information'
  }
  if(!user.paymentProviderId){
    const createdUser = await createUser(user);
    if(!createdUser) {
      return 'could not create user'
    } else {
      await updateUser(user.id, createdUser.id)
    }
    const setupIntent = await createSetupIntent(createdUser?.id);
    ok.log('', 'i made it here', setupIntent)
    if(setupIntent && createdUser) {
      ok.log('', 'i made it here even ', setupIntent)
      await pub(supabase, {
        sender: 'server/api/acl/stripe/webhooks/users',
        id: user.id
      }).paymentMethods({
        'provider': 'stripe',
        'intentToken': setupIntent.client_secret,
        'authenticationRequested': false
      })
    }
    return "successfully assigned internal userId with stripe userId"
  }
});