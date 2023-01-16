import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPPABASE_KEY || "";

console.log("supabaseUrl: ", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;