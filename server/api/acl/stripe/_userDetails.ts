import { ok } from '~/composables/ok';
import { messaging } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server';
import Stripe from 'stripe';
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const topic = 'userDetails';
  const service = 'aclStripe';
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity_id
  );
  await messaging.read(supabase, topic, service, body.record.message_id);  

    
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
  const userExists = await checkIfUserExists();

  ok.log('','user id: '+message.user_id);

  const createUser = async () => {
    const user = await stripe.customers.create({
      email: message.email,
      name: message.first_name+' '+message.last_name,
      metadata: { 
        user_id: message.user_id
      }
    });
    ok.log('succes', 'created user:', user)
    if (user) return user;
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
  const updateStripeUserDetails = async (stripeId) => {
    const updatedUser = await stripe.customers.update(
      stripeId, {
        name: message.first_name+' '+message.last_name,
      }
    );
  }
  if(userExists) {
    const updatedUser = await updateStripeUserDetails(userExists.stripe_user_id);
    return "user already exists"
  }
  if(!userExists) {
    const createdUser = await createUser();
    if (createdUser) await assignStripeId(message.user_id, createdUser.id);
    return "successfully assigned internal user_id with stripe user_id"
  }
});