import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
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
    console.error("❌ Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error("❌ User ID missing in metadata.");
        return res.status(400).send("Missing userId");
      }

      const customerId = session.customer as string;
      let interval = "unlimited"; // Default: one-time payment

      const subscriptionId = session.subscription;

      if (subscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
          const plan = subscription.items.data[0].plan;

          const billingInterval = plan.interval; // e.g. "month"
          const intervalCount = plan.interval_count; // e.g. 1

          const intervalDate = new Date();

          if (billingInterval === "month") {
            intervalDate.setMonth(intervalDate.getMonth() + intervalCount);
          } else if (billingInterval === "year") {
            intervalDate.setFullYear(intervalDate.getFullYear() + intervalCount);
          }

          interval = intervalDate.toISOString();
          console.log("✅ Manually calculated interval end date:", interval);
        } catch (err) {
          console.error("⚠️ Failed to retrieve subscription or calculate interval:", err);
          interval = "";
        }
      }

      const { error: updateError } = await supabase
        .from("profile")
        .update({
          is_subscribed: true,
          stripe_customer: customerId,
          interval,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("❌ Supabase update error:", updateError);
        return res.status(500).send("Supabase update failed");
      }

      console.log(`✅ User ${userId} marked as subscribed with interval: ${interval}`);
      break;
    }

    case "customer.subscription.deleted":
    case "invoice.payment_failed": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: profile, error } = await supabase
        .from("profile")
        .select("id")
        .eq("stripe_customer", customerId)
        .single();

      if (error || !profile?.id) {
        console.error("❌ Could not find user for Stripe customer:", customerId);
        return res.status(404).end();
      }

      const { error: subError } = await supabase
        .from("profile")
        .update({
          is_subscribed: false,
          interval: null,
        })
        .eq("id", profile.id);

      if (subError) {
        console.error("❌ Error updating subscription status:", subError);
        return res.status(500).send("Update failed");
      }

      console.log(`🔒 Subscription deactivated for user ${profile.id}`);
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return res.status(200).end(); // Don't return objects here
};

export default webhookHandler;
