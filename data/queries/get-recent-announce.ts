import { SupabaseClientType } from "@/utils/supabase/client";

export function getRecentAnnounce(
        client: SupabaseClientType
    ) {
    return client
        .from('annonce')
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)
        .throwOnError();
}