import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseAnonKey = process.env.SUPABASE_KEY;

export const supabase = createClient(
  "https://scashksznwiivlpgkftm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYXNoa3N6bndpaXZscGdrZnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyNDAwNDYsImV4cCI6MTk4MjgxNjA0Nn0.ieJoavsQ2ABZx2aBRjHwNi5nnQRWkfWMRdVGd_SuHpw",
  {
    auth: {
      storage: AsyncStorage as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
