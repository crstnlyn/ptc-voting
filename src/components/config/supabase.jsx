import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bryorqzjnuraptkkkgye.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeW9ycXpqbnVyYXB0a2trZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjU1MTIsImV4cCI6MjA3NDIwMTUxMn0.Fdo3GnFkBy_j5dB3boOfF0z07fwKiQZHQqxZeuHAhl4";
export const supabase = createClient(supabaseUrl, supabaseKey);
