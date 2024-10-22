import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

type Data = {
    ticket: string;
    newComment: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
}

export default handler;
