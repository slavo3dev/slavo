import supabase from "../supabase";
import { stripe } from "../stripe";



export const createOrRetrieveCustomer = async (userId: string, email: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  if (data?.stripe_customer_id) {
    return data.stripe_customer_id;
  }

  // Create customer in Stripe
  const customer = await stripe.customers.create({ email });

  // Save to Supabase
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);

  if (updateError) throw new Error(updateError.message);

  return customer.id;
};