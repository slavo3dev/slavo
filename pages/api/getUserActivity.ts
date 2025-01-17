import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userEmail } = req.query;
    const { data, error } = await supabase.from('user_activity').select('*').eq('user_email', userEmail);
}

