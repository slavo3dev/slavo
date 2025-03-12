import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id, columnName, value } = req.body;

    if (!id || !columnName || !value) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase
            .from('sources')
            .update({ [columnName]: value })
            .eq('id', id)
            .select();

        if (error) {
            throw error;
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}         