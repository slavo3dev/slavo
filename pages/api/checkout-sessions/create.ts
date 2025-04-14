import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrRetrieveCustomer } from "@/lib/createStripeCustomer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email, priceId } = req.body;
    if (!userId || !email || !priceId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Retrieve or create Stripe customer
    const customerId = await createOrRetrieveCustomer(userId, email);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cancel`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe session creation error:", err);
    return res.status(500).json({ error: 'Something went wrong creating the session', details: (err as Error).message });
  }
}

export default handler;
