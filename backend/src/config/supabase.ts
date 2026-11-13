import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// Server-side client using the service role key, which bypasses Row Level
// Security. It must never be imported by, or sent to, the frontend.
export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
