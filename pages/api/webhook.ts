import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import supabase from "@/lib/supabase";

// Disable body parsing (required by Stripe)
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event;

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
      console.error("User ID not found in session metadata.");
      return res.status(400).send("Missing userId in metadata");
    }

    //const customerId = session.customer as string;

    const { data: profileCheck } = await supabase
  .from("profile")
  .select("*")
  .eq("id", userId);

console.log("Matching profile:", profileCheck);

    const { data, error } = await supabase
      .from("profile")
      .update({is_subscribed: true, }) // do i need this in update method? stripe_customer: customerId,
      .eq("id", userId)
      .select();

      console.log("Updating profile:", {
        is_subscribed: true,
        
      });
    console.log("Result:", data);
    console.log("User ID from Stripe metadata:", userId);

    

    if (error) {
      console.error("Error updating profile in webhook:", error);
      return res.status(500).send("Failed to update profile");
    }

    console.log(`Successfully marked user ${userId} as subscribed.`);
  }

  res.status(200).end();
};

export default webhookHandler;
