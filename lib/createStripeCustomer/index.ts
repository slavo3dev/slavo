import supabase from "../supabase";
import { stripe } from "../stripe";

// Retrieve or create a Stripe customer
export const createOrRetrieveCustomer = async (userId: string, email: string) => {
  // Check if a customer already exists in Supabase
  const { data, error, count } = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', userId)
    //.single(); // .single() ensures only one row is expected
    console.log("Result:", data);

  if (error) {
    console.error("Error retrieving user from profile table:", error);
    throw new Error(error.message);
  }

  if (!data) {
    // If no user record found, create a new Stripe customer
    const customer = await stripe.customers.create({ email });
    console.log("Created new Stripe customer:", customer);

    // Save the new Stripe customer ID in Supabase
    const { error: updateError } = await supabase
      .from('profile')
      .update({ stripe_customer: customer.id })
      .eq('id', userId);

    if (updateError) {
      console.error("Error updating Supabase profile:", updateError);
      throw new Error(updateError.message);
    }
  console.log("Created new Stripe customer:", customer);

    return customer.id;
  }

  // If user record found and has a stripe_customer, return it
  if (data[0]?.stripe_customer) {
    return data[0].stripe_customer;
  }

  // If user exists but has no stripe_customer, create one
  const customer = await stripe.customers.create({ email });
  console.log("Created new Stripe customer:", customer.id);

  // Save the new Stripe customer ID in Supabase
  const { error: updateError } = await supabase
    .from('profile')
    .update({ stripe_customer: customer.id })
    .eq('id', userId);

  if (updateError) {
    console.error("Error updating Supabase profile:", updateError);
    throw new Error(updateError.message);
  }

  return customer.id;
};
