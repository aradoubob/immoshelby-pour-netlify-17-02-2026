import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration error:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
  console.error('Please restart the dev server to load environment variables from .env file');
  throw new Error(
    'Missing Supabase environment variables. Please restart the dev server to load .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
