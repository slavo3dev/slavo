import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Store this in .env

const FROM_EMAIL = "Your App <no-reply@slavo.io>"; // e.g. "<noreply@yourdomain.com>"

const expireSubscriptions = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end("Method not allowed");

  const now = new Date().toISOString();

  const { data: expiredUsers, error: fetchError } = await supabase
    .from("profile")
    .select("id, email, interval")
    .eq("is_subscribed", true)
    .not("interval", "is", null)
    .lt("interval", now); // interval < current time

  if (fetchError) {
    console.error("❌ Failed to fetch expired users:", fetchError);
    return res.status(500).json({ error: "Failed to fetch expired users" });
  }

  if (!expiredUsers || expiredUsers.length === 0) {
    console.log("✅ No expired subscriptions found.");
    return res.status(200).json({ message: "No expired subscriptions" });
  }

  const ids = expiredUsers.map((u) => u.id);

  // 1. Update Supabase
  const { error: updateError } = await supabase
    .from("profile")
    .update({ is_subscribed: false, interval: null })
    .in("id", ids);

  if (updateError) {
    console.error("❌ Failed to update expired subscriptions:", updateError);
    return res.status(500).json({ error: "Failed to update users" });
  }

  // 2. Send emails
  for (const user of expiredUsers) {
    if (!user.email) continue;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
        subject: "Your Subscription Has Expired",
        html: `
          <p>Hi there 👋,</p>
          <p>Your subscription has expired on our slavo.io App.</p>
          <p>If you'd like to continue enjoying our services, you can renew anytime from your account.</p>
          <p><a href="https://slavo.io/programs">Renew now</a></p>
          <p>Thank you!<br/>The slavo.io Team</p>
        `,
      });

      console.log(`📩 Sent expiration email to ${user.email}`);
    } catch (emailError) {
      console.error(`❌ Failed to send email to ${user.email}:`, emailError);
    }
  }

  return res.status(200).json({ message: `Expired ${ids.length} subscriptions and notified users.` });
};

export default expireSubscriptions;
