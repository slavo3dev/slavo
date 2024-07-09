/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


interface Source {
  id: number;
  text: string;
  source: string;
  category: string;
  email: string | null;
  created_at: string;
  exelent: number;
  false: number;
  like: number;
}


interface Data {
  ticket?: string;
  data?: Source | any;
  error?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	const { text, source, category, email } = req.body;
	try {
		const { data: insertedData, error } = await supabase
			.from("sources")
			.insert([{ text, source, category, email }])
			.select(); // Ensure that the inserted rows are returned

		if (error) {
			throw error;
		}
        
		// Return the inserted row(s) in the response
		res.status(200).json({ ticket: "Great New Source is Added", data: insertedData[0]});
	} catch (error) {
		throw new Error("Oops, Source was not created, please try again");
        
	}
}