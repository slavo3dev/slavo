import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


type Data = {
    ticket: string;
    newUpdate: any;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	try
	{
		if ( req.method === "PATCH" )
		{
			const { data, error } = await supabase
				.from("porch")
				.update({ "excellent": req.body.vote })
				.eq("id", req.body.id)
				.select();
            
			res.status( 200 ).json({
				ticket: "Thank you for support!!",
				newUpdate: data
			} );
		} else
		{
			const { data: newUpdate, error } = await supabase
				.from("porch")
				.insert([req.body])
				.select();
            
			res.status( 200 ).json({
				ticket: "Well Done - Your Daily Update is ADDED -",
				newUpdate: newUpdate
			} );
		}
        
	} catch (error) {
		throw new Error("Oops, Source was not created, please try again");
        
	}
}