import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

/* Update, Get, Delete, Post */
// Check to see if you can use switch and case for all the requests and responses
// const httpMethods = [Post, Put, Patch, Get, Delete];
// See what is cleaner separate files or one file with different cases
// Make it more readable
// Should I combine apis? 
// What is best api practices?
/* 
No, its better to have multiple files, with each file representening a different API
//  Better scalability and organization
//  enable more granular updates reducing risk of affected other endpoints when changes made to a single endpoint
//  Improve readability, can help in debugging by narrowing the focus of each file 
//  Reusability is more encouraged as it is easier to reuse parts of code across different endpoints 
Mainly best for scale as project evovles 
Otherwise, can use either or, but best practices is to create a separate file per API route
 */


// need to check if it is sending data 
const handler = async ( req: NextApiRequest, res: NextApiResponse) => {
    const { message, userInfo, sourceId } = req.body;

    
    if (req.method === `POST`) {
        if (!message || message.length < 0) {
            res.status(422).json({message: 'Invalid Comment Submission, missing one or two items'});
            return;
        }
    }

    const storeCommentData = {
        message: message.trim(),
        userInfo: userInfo.trim(),
        sourceId: sourceId
    }

    try {
        const {data, error} = await supabase
            .from('comments')
            .insert([storeCommentData])
            .select()
        if (error) {
            console.error('Supabase Insert Error:', error);
            return res.status(500).json({
                message: 'Failed to store the comment in the database.',
                error: error.message,
            });
        }

        const savedComment = data[0] || 'Not correct storage call';

        return res.status(202).json({
                message: 'success! comment stored', 
                payload: savedComment,
            });
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({
            message: 'Oops something is wrong. Storing the comment failed...'
        });
    }
};   

export default handler;
