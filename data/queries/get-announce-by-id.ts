import { SupabaseClientType } from "@/utils/supabase/client";

export function getAnnounceByID(
        client: SupabaseClientType,
        announce_id: string
    ) {
    return client
        .from('annonce')
        .select("*")
        .eq("id", announce_id)
        .single()
        .throwOnError();
}