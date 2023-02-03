import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@lib/supabase";


type Data = {
  name: string
}

async function signInWithEmail (email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	} );
	return { data, error } ;
	
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	if ( req.method === "POST" )
	{
		const { email, password } = req.body;
		const data = await signInWithEmail( email, password );
    
		console.log("Data: ",  data );
		res.status(200).json(req.body );
	}
}