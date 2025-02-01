import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const userEmail = req.query.email as string;

    if (!userEmail) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Fetch user activity data
        const { data: userActivityData, error: activityError } = await supabase
            .from('user_activity')
            .select('weekly_goal, longest_streak')
            .eq('user_email', userEmail)
            .single();

        if (activityError) {
            throw activityError;
        }

        // Fetch learning data
        const { data: learningData, error: learningError } = await supabase
            .from('porch')
            .select('created_at')
            .eq('email', userEmail)
            .order('created_at', { ascending: true });

        if (learningError) {
            throw learningError;
        }

        return res.status(200).json({
            userActivityData,
            learningData
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

