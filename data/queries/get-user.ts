import { SupabaseClientType } from "@/utils/supabase/client";

export function getUserById(
        client: SupabaseClientType, 
        userId: string
    ) {
    return client
        .from('profiles')
        .select(`
            id,
            created_at,
            full_name,
            phone,
            avatar_url
        `)
        .eq('id', userId)
        .throwOnError()
        .single();
}