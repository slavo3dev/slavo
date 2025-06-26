import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";
import type Stripe from "stripe";

export const config = {
  api: { bodyParser: false },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("Missing userId in metadata.");
      return res.status(400).send("Missing userId");
    }

    // Optional: Check first
    const { data: profileCheck, error: checkError } = await supabase
      .from("profile")
      .select("is_subscribed")
      .eq("id", userId)
      .single();

    if (checkError) {
      console.error("Profile fetch error:", checkError);
      return res.status(500).send("Supabase profile fetch failed");
    }

    if (profileCheck?.is_subscribed) {
      console.log(`User ${userId} already subscribed.`);
      return res.status(200).end();
    }

    const { error } = await supabase
      .from("profile")
      .update({
        is_subscribed: true,
        stripe_customer: session.customer as string,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      return res.status(500).send("Failed to update profile");
    }

    console.log(`Successfully marked user ${userId} as subscribed.`);
  }

  res.status(200).end();
};

export default webhookHandler;
