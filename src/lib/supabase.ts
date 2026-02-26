import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Environment variables:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  allEnv: import.meta.env
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing env vars:', { supabaseUrl, supabaseAnonKey });
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
