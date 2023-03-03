import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabase";


type Data = {
  sources: []
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{

	const query = supabase.from( "sources" ).select( "*" );
	const { data: sources, error }: any = await query
		.order("like", { ascending: false })
		.limit( 1000 );
        
	if ( !error ) { 
		res.status(200).json({ sources });  
	} {
		throw new Error("Oops... Something went wrong, please refresh & try again");
	}
        
	
}