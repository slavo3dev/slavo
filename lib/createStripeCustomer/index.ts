import supabase from "../supabase";
import { stripe } from "../stripe";



export const createOrRetrieveCustomer = async (userId: string, email: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);

  if (data?.stripe_customer) {
    return data.stripe_customer;
  }

  // Create customer in Stripe
  const customer = await stripe.customers.create({ email });

  // Save to Supabase
  const { error: updateError } = await supabase
    .from('profile')
    .update({ stripe_customer: customer.id })
    .eq('id', userId);

  if (updateError) throw new Error(updateError.message);

  return customer.id;
};