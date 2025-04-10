import { stripe } from "@/lib/stripe";
import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

const products = await stripe.products.list();
console.log(products);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceId, userId } = req.body;

  // Get user data from Supabase
  const { data: user, error } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", userId)
    .single();

  if (error) {
    return res.status(500).json({ error: "User not found" });
  }

  let customerId = user?.stripe_customer;

  // If the user doesn't have a Stripe customer ID, create one
  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { userId },
    });

    customerId = customer.id;

    // Store the Stripe customer ID in Supabase
    await supabase
      .from("profile")
      .update({ stripe_customer: customerId })
      .eq("id", userId);
  }

  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cancel`,
  });

  res.json({ url: session.url });
}

export default handler;