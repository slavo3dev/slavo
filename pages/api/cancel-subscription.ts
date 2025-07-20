import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  // Fetch subscription_id from profile
  const { data: profile, error } = await supabase
    .from("profile")
    .select("subscription_id")
    .eq("id", userId)
    .single();

  if (error || !profile?.subscription_id) {
    return res.status(404).json({ error: "Subscription not found" });
  }

  try {
    // Mark Stripe subscription to cancel at the end of billing period
    const updatedSubscription = await stripe.subscriptions.update(profile.subscription_id, {
      cancel_at_period_end: true,
    });

 
  } catch (err) {
    console.error("❌ Stripe cancel error:", err);
    return res.status(500).json({ error: "Cancellation failed" });
  }
}
