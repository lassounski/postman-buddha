import { createBrowserClient } from '@supabase/ssr';
import { Database } from './supabase-types';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export default function createClient() {
    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}

