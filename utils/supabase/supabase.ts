import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '../../database.types';
import { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient() {
    if (client) {
        return client;
    }

    client = createBrowserClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
    );

    return client;
}