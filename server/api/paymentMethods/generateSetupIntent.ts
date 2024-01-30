import Stripe from 'stripe';
import { ok } from '~/composables/ok'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const stripeSecret = process.env.STRIPE_SECRET_KEY as string;
  const stripePaymentMethodConfiguration = process.env.STRIPE_PAYMENT_METHOD_CONFIGURATION as string;
  const stripe = new Stripe(stripeSecret); // your stripe key here

  let data, error;

  const createSetupIntent = async (customerID: string) => {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerID,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true
      },
      payment_method_configuration: stripePaymentMethodConfiguration
    });
    ok.log('success', 'created setupIntent: ', setupIntent.client_secret)
    return setupIntent;
  }
  const saveSetupIntent = async (user, setupIntent) => {
    const error = await pub(supabase, {
      sender: 'server/api/acl/stripe/webhooks/users',
      id: user.id
    }).paymentMethods({
      'provider': 'stripe',
      'intentToken': setupIntent.client_secret,
      'authenticationRequested': false,
      'used': false
    });
    if (error) {
      ok.log('error', error)
      return 'error'
    } else {
      return setupIntent
    }
  };

  const user = body.user;

  if (user.paymentProviderId) {
    const setupIntent = await createSetupIntent(user.paymentProviderId);
    if (setupIntent) {
      await saveSetupIntent(user, setupIntent);
      data = {
        intentToken: setupIntent.client_secret
      }
    }
  } else {
    ok.log('error', 'user.paymentProviderId not found')
    error = {
      message: 'user.paymentProviderId not found'
    }
  }
  return { data, error }
});