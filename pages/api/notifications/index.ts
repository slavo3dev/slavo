import { NextApiRequest, NextApiResponse } from "next";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Email is required.",
    });
  }

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("recipient_email", email)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Failed to fetch notifications:", error);

      return res.status(500).json({
        message: "Failed to fetch notifications.",
      });
    }

    return res.status(200).json(data ?? []);
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
};

export default handler;
