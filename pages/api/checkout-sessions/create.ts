import { stripe } from "@/lib/stripe";
import { useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrRetrieveCustomer } from "@/lib/createStripeCustomer";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

const products = await stripe.products.list();
console.log(products);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

 
  
try {

  const body = req.body;
    console.log("Request body:", body);

  const { userId, email, priceId } = req.body;

  if (!userId || !email || !priceId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const customerId = await createOrRetrieveCustomer(userId, email);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ 
      price: priceId,
      quantity: 1 
    }],
    customer_email: email,
    metadata: {
      userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cancel`,
  });
  return res.status(200).json({ sessionId: session.id });
}
  catch (err) {
    return res.status(500).json({ error: 'Something went wrong creating the session' });
  }
}

export default handler;