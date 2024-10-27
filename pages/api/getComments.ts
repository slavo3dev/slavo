import { NextApiRequest, NextApiResponse } from "next";
import supabase from "lib/supabase";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*');
            
            console.log("Data from supabase", data);
            console.log("Error related to supabase", error)
            
        if (error) {
            return res.status(500).json({ error: "Failed to fetch comments"})
        }
        
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No comments found"})
        } 
        
        return res.status(200).json(data)

    } catch (error) {
        console.log("Caught Error", error);
        return res.status(500).json({ error: "Oops... Something went wrong, please refresh & try again"})
    }
    
}

export default handler;

