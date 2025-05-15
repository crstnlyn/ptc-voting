import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://srotendfzypxqonjzqno.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb3RlbmRmenlweHFvbmp6cW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTEyNzcsImV4cCI6MjA2Mjg4NzI3N30.k30YwvzowPRgHHPAr14Ex3tAqBVPTMidvSq0jGjecPA";
export const supabase = createClient(supabaseUrl, supabaseKey);
