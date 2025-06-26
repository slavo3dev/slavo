import supabase from "../supabase";
import { stripe } from "../stripe";

// Retrieve or create a Stripe customer
export const createOrRetrieveCustomer = async (userId: string, email: string): Promise<string> => {
  // 1. Try to get the stripe_customer field for the user
  const { data, error } = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', userId)
    .single(); // Ensure only one user is returned

  if (error) {
    console.error("Error retrieving user from profile table:", error);
    throw new Error("Supabase fetch error: " + error.message);
  }

  // 2. If stripe_customer already exists, return it
  if (data?.stripe_customer) {
    console.log("Stripe customer already exists:", data.stripe_customer);
    return data.stripe_customer;
  }

  // 3. Otherwise, create a new Stripe customer
  const customer = await stripe.customers.create({ email });
  console.log("Created new Stripe customer:", customer.id);

  // 4. Update Supabase with the new Stripe customer ID
  const { error: updateError } = await supabase
    .from('profile')
    .update({ stripe_customer: customer.id })
    .eq('id', userId);

  if (updateError) {
    console.error("Error updating Supabase profile:", updateError);
    throw new Error("Supabase update error: " + updateError.message);
  }

  return customer.id;
};
