/* eslint-disable @typescript-eslint/no-explicit-any */
export const verifyStripe: ( { req, stripe, endpointSecret }: any ) => any = async ({ req, stripe, endpointSecret }) => {
	async function buffer(readable: any) {
		const chunks = [];
		for await (const chunk of readable) {
			chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
		}
		return Buffer.concat(chunks);
	}

	const buf = await buffer(req);
	const sig = req.headers["stripe-signature"];

	const event = stripe.webhooks.constructEvent(
		buf.toString(),
		sig,
		endpointSecret
	);

	return event;
};

module.exports = verifyStripe;