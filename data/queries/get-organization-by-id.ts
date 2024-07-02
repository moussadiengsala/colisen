import { SupabaseClientType } from "@/utils/supabase/client";

export function getAnnounceById(
        client: SupabaseClientType, 
        annonceId: number
    ) {
    return client
        .from('annonce')
        .select(`
            id,
            name
        `)
        .eq('id', annonceId)
        .throwOnError()
        .single();
}