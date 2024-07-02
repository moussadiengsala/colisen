// import { createBrowserClient } from "@supabase/ssr";

// export const createClient = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );


import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export type SupabaseClientType = SupabaseClient<Database>;
let client: SupabaseClientType | undefined

export function getSupabaseBrowserClient() {
    if (client) {
        return client;
    }
    client = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    return client;
}