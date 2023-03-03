// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


type Data = {
  ticket: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	const { text, source, category, email } = req.body;
	try {
		await supabase
			.from("sources")
			.insert([{text, source, category, email }])
			.select();
        
		res.status(200).json({ ticket: "Great New Source is Added" });
	} catch (error) {
		throw new Error("Oops, Source was not created, please try again");
        
	}
}