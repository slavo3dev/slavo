import supabase from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
)
{
    
	const { error } = await supabase.auth.signOut();
    
	if ( error )
	{
		res.json(error);
	}
     
	res.status(200).json({ logout: "You are succefuly logout" });
	
}
