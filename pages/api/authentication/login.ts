import supabase from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
)
{

	const { email, password } = req.body;
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
    
	if ( error )
	{
		res.json(error);
	}
     
	res.status(200).json({ data });
	
}
