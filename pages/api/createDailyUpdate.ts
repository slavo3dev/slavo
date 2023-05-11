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
	try {
		await supabase
			.from("porch")
			.insert([req.body])
			.select();
        
		res.status(200).json({ ticket: "Well Done - Your Daily Update is ADDED -" });
	} catch (error) {
		throw new Error("Oops, Source was not created, please try again");
        
	}
}