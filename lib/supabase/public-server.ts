import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

/**
 * Creates a Supabase client for public/unauthenticated operations.
 * This client uses the service role key to bypass RLS for customer creation.
 * This is safe because the API endpoint validates the loyalty program exists
 * before creating customers.
 */
export function createPublicServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  // Use service role key if available (bypasses RLS), otherwise use anon key
  const key = serviceRoleKey || anonKey;

  if (!key) {
    throw new Error('Missing Supabase keys');
  }

  return createClient<Database>(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

