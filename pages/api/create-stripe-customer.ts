import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import supabase from "@/lib/supabase";

type Data = {
  message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{

	if ( req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
		return res.status(401).send({message: "You are not auth to use this api"});
	}
	const stripeSecretKey: string | undefined = process.env.STRIPE_SECRET_KEY;
	if (!stripeSecretKey) {
		throw new Error("STRIPE_SECRET_KEY is not defined in the .env file");
	}
	const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-08-16" });

	const customer = await stripe.customers.create({
		email: req.body.record.email,
	} );

	await supabase
		.from("profile")
		.update({
			stripe_customer: customer.id,
		})
		.eq("id", req.body.record.id);

	res.send({ message: `stripe customer created: ${customer.id}` });
    
	console.log(req, res);
}