import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
)
{
	try {
		if ( req.method === "PATCH" ) {
            const { message, id } = req.body;

			const { data, error } = await supabase
				.from("comments")
				.update({ message })
				.eq("id", id)
				.select();

            if (error) {
                return res.status(500).json({
                    error: "Failed to update comment",
                    details: error.message
                })
            }
            
			return res.status( 200 ).json({
				ticket: "Thank You for your support!!",
				newComment: data,
			});

        } else {
            res.setHeader("Allow", ["PATCH"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        console.error("Error Updating Database for Comments", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}