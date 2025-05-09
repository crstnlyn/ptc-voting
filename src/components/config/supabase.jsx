import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jexvsckbjgehvavmznld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleHZzY2tiamdlaHZhdm16bmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTQ3ODgsImV4cCI6MjA2MDk3MDc4OH0.9TmzvMjBBRhsOH6JIJ7Zll6fNIsKF6Beh6J6m6B82_s";

export const supabase = createClient(supabaseUrl, supabaseKey);
