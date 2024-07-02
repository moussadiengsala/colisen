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
            first_name,
            last_name,
            telephone,
            avatar_url
        `)
        .eq('id', userId)
        .throwOnError()
        .single();
}