import Stripe from 'stripe';
import { ok } from '~/composables/ok'
import { pub } from '~/composables/messaging'
import { get } from '~/composables/get'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)

  const stripeSecret = process.env.STRIPE_SECRET_KEY as string;
  const stripePaymentMethodConfiguration = process.env.STRIPE_PAYMENT_METHOD_CONFIGURATION as string;
  const stripe = new Stripe(stripeSecret);
  
  let data, error;

  if(!body.user){
    error = {
      status: 400,
      message: 'no user'
    }
  } else if(!body.user.paymentProviderId){
    error = {
      status: 400,
      message: 'no paymentProviderId'
    }
  }
  
  const getDefaultPaymentMethod = async (id: string) => {
    return await stripe.paymentMethods.retrieve(id);
  };
  const user = await get(supabase).user(body.user);
  const paymentMethod = await get(supabase).paymentMethod(user);
  ok.log('', paymentMethod)
  if(!paymentMethod || !paymentMethod.methodId){
    error = {
      status: 400,
      message: 'no paymentMethod'
    }
  } else {
    data = await getDefaultPaymentMethod(paymentMethod.methodId);
  }

  return { data, error };
});