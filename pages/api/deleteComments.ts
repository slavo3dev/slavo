import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
)
{
	try {
		if ( req.method === "DELETE" ) {
            const { id } = req.body;
            
            if (!id) {
                return res.status(400).json({ error: "Comment ID is requred"})
            }
			const { data, error } = await supabase
				.from("comments")
				.delete()
				.eq("id", id)

            if (error) {
                return res.status(500).json({
                    error: "Failed to delete comment",
                    details: error.message,
                })
            }
            
			return res.status( 200 ).json({
				ticket: "Thank You for your support!!",
				deletedComment: data,
			});

        } else {
            res.setHeader("Allow", ["DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        console.error("Error Deleting Comment from Database", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}