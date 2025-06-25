import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPPABASE_KEY! // ONLY safe on server
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
          if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
          }
        
          const { email } = req.body;
        
          if (!email) {
            return res.status(400).json({ error: "Email is required" });
          }
        
          try {
            // Get a paginated list of users (max 1000)
            const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        
            if (error) {
              console.error("Error listing users:", error.message);
              return res.status(500).json({ error: "Failed to retrieve users" });
            }
        
            const userExists = data.users.some((user) => user.email?.toLowerCase() === email.toLowerCase());
        
            if (!userExists) {
              return res.status(404).json({ exists: false });
            }
        
            return res.status(200).json({ exists: true });
          } catch (err) {
            console.error("Unexpected error:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
        }