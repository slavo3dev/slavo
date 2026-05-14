import { NextApiRequest, NextApiResponse } from "next";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Notification id is required.",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Failed to mark notification as read:", error);

    return res.status(500).json({
      message: "Failed to mark notification as read.",
    });
  }

  return res.status(200).json({
    message: "Notification marked as read.",
    payload: data?.[0],
  });
};

export default handler;
