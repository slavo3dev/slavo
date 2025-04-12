import supabase from "../supabase";

export const updateStripeCustomer = async (userId: string, email: string, stripeCustomerId: string, isSubscribed: boolean) => {
  const { data, error } = await supabase
    .from("profile")
    .upsert(
      {
        id: userId, // Matching the `userId` in profile table
        email, // user's email
        stripe_customer: stripeCustomerId, // Stripe customer ID
        is_subscribed: isSubscribed, // Subscription status
      },
      { onConflict: "id" } // If the user already exists, it will update the profile
    );

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }

  console.log("Profile updated successfully:", data);
  return data;
};
