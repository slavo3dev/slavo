import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, userInfo, sourceId } = req.body;
  const { id } = req.query;

  if (req.method === `POST`) {
    if (!message || message.length < 1) {
      res.status(422).json({ message: 'Invalid Comment Submission, message is required' });
      return;
    }

    const storeCommentData = {
      message: message.trim(),
      userInfo: userInfo.trim(),
      sourceId: sourceId
    };

    try {
      const { data, error } = await supabase
        .from('porch-comments') 
        .insert([storeCommentData])
        .select();
      if (error) {
        console.error('Supabase Insert Error:', error);
        return res.status(500).json({
          message: 'Failed to store the comment in the database.',
          error: error.message,
        });
      }

      const savedComment = data[0];

      return res.status(202).json({
        message: 'Success! Comment stored',
        payload: savedComment,
      });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({
        message: 'Oops, something went wrong. Storing the comment failed...'
      });
    }
  } else if (req.method === 'PUT') {
    if (!id || !message || message.length < 1) {
      res.status(422).json({ message: 'Invalid comment update, message is required and ID must be provided.' });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('porch-comments') 
        .update({ message: message.trim() })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase Update Error:', error);
        return res.status(500).json({ message: 'Failed to update the comment in the database.' });
      }

      return res.status(200).json({
        message: 'Success! Comment updated.',
        payload: data[0],
      });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Failed to update the comment.' });
    }
  } else if (req.method === 'DELETE') {
    if (!id) {
      res.status(422).json({ message: 'Invalid request, comment ID required' });
      return;
    }

    try {
      const { error } = await supabase
        .from('porch-comments') 
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase Delete Error:', error);
        return res.status(500).json({ message: 'Failed to delete the comment.' });
      }

      return res.status(200).json({
        message: 'Success! Comment deleted.',
      });
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Failed to delete the comment.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
