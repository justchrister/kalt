import { ok } from '~/composables/ok';
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
  ok.log('',message)
  if(!message.firstName) return "no first name"
  if(!message.lastName) return "no last name"

  const checkIfUserExists = async () => {
    const { data, error } = await supabase
      .from('acl_stripe')
      .select()
      .eq('userId', message.id)
      .limit(1)
      .single()
    
    if(error) {
      ok.log('', 'nah, user dont exist ')
      return false
    } else {
      ok.log('success', 'user exists: '+data.stripeUserId)
      return data
    } 
  }
  const userExists = await checkIfUserExists();

  ok.log('','user id: '+message.userId);

  const createUser = async () => {
    const user = await stripe.customers.create({
      email: message.email,
      name: message.firstName+' '+message.lastName,
      metadata: { 
        userId: message.id
      }
    });
    if (user) {
      ok.log('succes', 'created user:', user)
      return user;
    } else {
      ok.log('error', 'could not create user')
      return;
    }
  };

  const assignStripeId = async (userId: string, stripeUserId: string) => {
    const { data, error } = await supabase
      .from('acl_stripe')
      .insert({
        userId: userId,
        stripeUserId: stripeUserId
      })
      .select()
    if(error){
      ok.log('error', error)
    } else {
      ok.log('success', 'assigned stripe id: '+data.stripeUserId)
      return data
    }
  }

  const updateStripeUser = async (stripeId: string) => {
    const updatedUser = await stripe.customers.update(
      stripeId, {
        name: message.firstName+' '+message.lastName,
      }
    );
    return updatedUser
  }

  if(userExists) {
    const updatedUser = await updateStripeUser(userExists.stripeUserId);
    return updatedUser
  }
  if(!userExists) {
    const createdUser = await createUser();
    if (createdUser) await assignStripeId(message.id, createdUser.id);
    return "successfully assigned internal userId with stripe userId"
  }
});