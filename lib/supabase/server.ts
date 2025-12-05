import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const cookieStore = await cookies();

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          return cookieStore.get(key)?.value ?? null;
        },
        setItem: (key: string, value: string) => {
          try {
            cookieStore.set(key, value);
          } catch (error) {
            // Ignore cookie setting errors in read-only contexts
            console.warn('Failed to set cookie:', key);
          }
        },
        removeItem: (key: string) => {
          try {
            cookieStore.delete(key);
          } catch (error) {
            // Ignore cookie deletion errors in read-only contexts
            console.warn('Failed to delete cookie:', key);
          }
        },
      },
    },
  });
}

