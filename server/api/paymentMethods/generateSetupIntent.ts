import { ok } from '~/composables/ok'
import { pub } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  
  const createSetupIntent = async (customerID: string) => {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerID,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true
      },
      payment_method_configuration: stripePaymentMethodConfiguration
    });
    ok.log('success', 'created setupIntent: ', setupIntent)
    return setupIntent;
  }
  const saveSetupIntent = async (user, setupIntent) => {
    const error = await pub(supabase, {
      sender: 'server/api/acl/stripe/webhooks/users',
      id: user.id
    }).paymentMethods({
      'provider': 'stripe',
      'intentToken': setupIntent.client_secret,
      'authenticationRequested': false
    });
    if(error) {
      return 'error'
    } else {
      return 'ok'
    }
  };

  const user = body.user;

  if(user.paymentProviderId) {
    const setupIntent = await createSetupIntent(user.paymentProviderId);
    if(setupIntent) {
      return await saveSetupIntent(user, setupIntent);
    }
  }
  return 'error'
});