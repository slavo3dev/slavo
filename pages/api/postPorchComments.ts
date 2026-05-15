import { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabase";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

const createPorchCommentNotification = async ({
  sourceId,
  actorEmail,
}: {
  sourceId: string | number;
  actorEmail: string;
}) => {
  const { data: porch, error: porchError } = await supabase
    .from("porch")
    .select("email, text")
    .eq("new_id", sourceId)
    .maybeSingle();

  if (porchError) {
    console.error(
      "Failed to fetch porch for notification:",
      porchError,
    );
    return;
  }

  const recipientEmail = porch?.email;

  // Do not notify if there is no owner or if user comments on their own post
  if (!recipientEmail || recipientEmail === actorEmail) {
    return;
  }

  // This is where the notification is created.
  // Important: use supabaseAdmin here, not regular supabase.
  const { error: notificationError } = await supabaseAdmin
    .from("notifications")
    .insert([
      {
        recipient_email: recipientEmail,
        actor_email: actorEmail,
        type: "porch_comment",
        source_id: String(sourceId),
        message: `${actorEmail} commented on your Porch update.`,
        is_read: false,
      },
    ]);

  if (notificationError) {
    console.error(
      "Failed to create notification:",
      notificationError,
    );
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "POST") {
    const { message, userInfo, sourceId } = req.body;

    if (!message || message.trim().length < 1) {
      return res.status(422).json({
        message: "Invalid comment submission. Message is required.",
      });
    }

    if (!userInfo || userInfo.trim().length < 1) {
      return res.status(422).json({
        message:
          "Invalid comment submission. User email is required.",
      });
    }

    if (!sourceId) {
      return res.status(422).json({
        message: "Invalid comment submission. Source id is required.",
      });
    }

    const storeCommentData = {
      message: message.trim(),
      userInfo: userInfo.trim(),
      sourceId,
    };

    try {
      const { data, error } = await supabase
        .from("porch-comments")
        .insert([storeCommentData])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);

        return res.status(500).json({
          message: "Failed to store the comment in the database.",
          error: error.message,
        });
      }

      const savedComment = data?.[0];

      try {
        await createPorchCommentNotification({
          sourceId,
          actorEmail: userInfo.trim(),
        });
      } catch (notificationError) {
        console.error(
          "Notification failed, but comment was saved:",
          notificationError,
        );
      }

      return res.status(202).json({
        message: "Success! Comment stored.",
        payload: savedComment,
      });
    } catch (error) {
      console.error("Error:", error);

      return res.status(500).json({
        message:
          "Oops, something went wrong. Storing the comment failed.",
      });
    }
  }

  if (req.method === "PUT") {
    const { message } = req.body;

    if (!id || !message || message.trim().length < 1) {
      return res.status(422).json({
        message:
          "Invalid comment update. Message is required and id must be provided.",
      });
    }

    try {
      const { data, error } = await supabase
        .from("porch-comments")
        .update({ message: message.trim() })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Supabase update error:", error);

        return res.status(500).json({
          message: "Failed to update the comment in the database.",
        });
      }

      return res.status(200).json({
        message: "Success! Comment updated.",
        payload: data?.[0],
      });
    } catch (error) {
      console.error("Error:", error);

      return res.status(500).json({
        message: "Failed to update the comment.",
      });
    }
  }

  if (req.method === "DELETE") {
    if (!id) {
      return res.status(422).json({
        message: "Invalid request. Comment id is required.",
      });
    }

    try {
      const { error } = await supabase
        .from("porch-comments")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase delete error:", error);

        return res.status(500).json({
          message: "Failed to delete the comment.",
        });
      }

      return res.status(200).json({
        message: "Success! Comment deleted.",
      });
    } catch (error) {
      console.error("Error:", error);

      return res.status(500).json({
        message: "Failed to delete the comment.",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed.",
  });
};

export default handler;
