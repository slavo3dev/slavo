import { NextApiRequest, NextApiResponse } from "next";
import supabase from "lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sourceId } = req.query;

  if (!sourceId) {
    return res.status(400).json({ error: "sourceId is required" });
  }

  const { data, error } = await supabase
    .from("porch-comments")
    .select("*")
    .eq("sourceId", sourceId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);

    return res.status(500).json({
      error: "Failed to fetch comments",
    });
  }

  return res.status(200).json(data ?? []);
}
