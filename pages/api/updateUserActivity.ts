import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, weekly_goal, longest_streak } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const { data, error } = await supabase
            .from('user_activity')
            .update({
                weekly_goal,
                longest_streak,
            })
            .eq('user_email', email)
            .select();

        if (error) {
            throw error;
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}