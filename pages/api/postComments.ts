import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, userInfo, sourceId, commentId } = req.body;

    // POST: Add a new comment
    if (req.method === 'POST') {
        if (!message || message.trim().length === 0) {
            return res.status(422).json({ message: 'Invalid Comment Submission, message is required' });
        }

        const storeCommentData = {
            message: message.trim(),
            userInfo: userInfo || 'Anonymous',
            sourceId,
        };

        try {
            const { data, error } = await supabase
                .from('comments')
                .insert([storeCommentData])
                .select('id, message, userInfo, sourceId');

            if (error) {
                console.error('Supabase Insert Error:', error);
                return res.status(500).json({ message: 'Failed to store the comment in the database.' });
            }

            return res.status(201).json({ message: 'Success! Comment stored', payload: data[0] });
        } catch (error) {
            console.error('Unexpected Error:', error);
            return res.status(500).json({ message: 'Oops! Something went wrong. Storing the comment failed...' });
        }
    }

    // PUT: Edit an existing comment
    if (req.method === 'PUT') {
        if (!commentId || !message) {
            return res.status(400).json({ message: 'Comment ID and message are required to update' });
        }

        try {
            const { data, error } = await supabase
                .from('comments')
                .update({ message: message.trim() })
                .eq('id', commentId)
                .select();

            if (error) {
                console.error('Supabase Update Error:', error);
                return res.status(500).json({ message: 'Failed to update the comment.' });
            }

            return res.status(200).json({ message: 'Comment updated successfully', payload: data[0] });
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ message: 'Error updating the comment.' });
        }
    }

    // DELETE: Delete a comment
    if (req.method === 'DELETE') {
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID is required to delete' });
        }

        try {
            const { error } = await supabase.from('comments').delete().eq('id', commentId);

            if (error) {
                console.error('Supabase Delete Error:', error);
                return res.status(500).json({ message: 'Failed to delete the comment.' });
            }

            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ message: 'Error deleting the comment.' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
};

export default handler;
