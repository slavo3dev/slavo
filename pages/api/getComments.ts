// import { NextApiRequest, NextApiResponse } from "next";
// import supabase from "@/lib/supabase";

// type Comment = {
//     id: string;
//     created_at: string;
//     message: string;
//     userInfo: string;
//     sourceId: string;
// }

// type Data = {
//    comments: Comment[] | [];
//    error?: string;
// }

// const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//     try {
//         const { data: comments, error }= await supabase
//             .from('comments')
//             .select('*')
//             .order('id', { ascending: false })
//             .limit( 100 );

//         if (error) {
//             res.status(500).json({ comments: [], error: "Failed to fetch comments"})
//         } else {
//             res.status(200).json({ comments: [] })

//         }
//     } catch (error) {
//         res.status(500).json({ comments: [], error: "Oops... Something went wrong, please refresh & try again"})
//     }
    
// }

// export default handler;

/* Need to get dummy data to upload to Database and then pull and test see the response I am getting. */