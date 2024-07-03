import useSupabase from "./use-supabase";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnnounce } from "@/data/queries/get-recent-announce";
import { getUserById } from "@/data/queries/get-user";
import getFilteredData from "@/data/queries/filter-announce";

function useFilterAnnounce(searchParams: { [key: string]: string | string[] | undefined }, limit: number) {
    const client = useSupabase();
    const queryKey = ['announce-filter', Object.values(searchParams || {}).join(',')];

    const queryFn = async () => {
        try {
            const { data: announces, error, total } = await getFilteredData(searchParams, client, limit);
            if (error) throw new Error(error.message);
            if (!announces) return {}

            const announcesWithProfiles = await Promise.all(
                announces.map(async (announce) => {
                    const { data: profile, error: profileError } = await getUserById(client, announce.user_id);
                    if (profileError) throw new Error(profileError.message);
                    return { announce, profile };
                })
            );

            return {
                announces: announcesWithProfiles,
                total
            };
        } catch (error) {
            throw error;
        }
    };

    return useQuery({ queryKey, queryFn });
}

export default useFilterAnnounce;