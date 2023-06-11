import stripeInit from "stripe";
import Cors from "micro-cors";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyStripe } from "@/lib/stripe";


const cors: any = Cors( { allowMethods: [ "POST", "HEAD" ] } );
const stripe = new stripeInit( process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15" } );
const endpointSecret = process.env.STRIPE_AIMENTOR_WEBHOOK_SECRET;

export const config = {
	api: {
		bodyParser: false
	}
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse ) =>
{
	if ( req.method === "POST" )
	{
		let event;
		try
		{
			event = await verifyStripe( { req, stripe, endpointSecret } );
		} catch ( err )
		{
			console.log(`[ Stripe WebHook ] - Error Msg: ${err}`);
		}
     
		console.log("event.type: ", event.type);

		switch (event.type) {
		case "payment_intent.succeeded": {
			console.log("Successful Payment");  
		}    
			break;
		default:
			console.log("Unhandle event: ", event.type);
			break;
		}
		res.status( 200 ).json({recieved: true}); 
	}
};


export default cors(handler);