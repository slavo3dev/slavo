// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import stripeInit from "stripe";

type PaymentData = {
    session: unknown
}

const stripe  = new stripeInit(process.env.STRIPE_SECRET_KEY || "", {apiVersion: "2022-11-15"});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PaymentData>
)
{
	const productItems = [ {
		price: process.env.STRIPE_AIMENTOR_PRODUCT_PRICE_ID,
		quantity: 1
	} ];
    
	const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
	const host = req.headers.host;
    
	const checkoutSession = await stripe.checkout.sessions.create({
		line_items: productItems,
		mode: "subscription",
		success_url: `${ protocol }${ host }/success`,
		customer_email: req.body.email
	} );
    
	res.status(200).json({ session: checkoutSession });
}
