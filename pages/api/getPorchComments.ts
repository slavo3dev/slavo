import { NextApiRequest, NextApiResponse } from 'next';
import supabase from 'lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sourceId } = req.query;

  if (!sourceId) {
    return res.status(400).json({ error: "sourceId is required" });
  }

  const { data, error } = await supabase
    .from('porch-comments') // Use 'porch-comments' table
    .select('*')
    .eq('sourceId', Number(sourceId)); // Ensure correct data type

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }

  // Return an empty array if data is null
  res.status(200).json(data ?? []);
}
