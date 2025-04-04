import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2025-03-31.basil"})
console.log(stripe.products)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product Name'
            },
            unit_amount: 1000,
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`
    })

    res.status(200).json({id: session.id})

  } else {
    res.setHeader("AllOW", "POST");
    res.status(405).end("Method Not Allowed")
  }
}

export default handler;