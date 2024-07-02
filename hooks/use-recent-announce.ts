import useSupabase from "./use-supabase";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnnounce } from "@/data/queries/get-recent-announce";
import { getUserById } from "@/data/queries/get-user";

function useRecentAnnounceQuery() {
    const client = useSupabase();
    const queryKey = ['announce', "recent-announce"];

    const queryFn = async () => {
        try {
            const { data: announces, error } = await getRecentAnnounce(client);
            if (error) throw new Error(error.message);

            const announcesWithProfiles = await Promise.all(
                announces.map(async (announce) => {
                    const { data: profile, error: profileError } = await getUserById(client, announce.user_id);
                    if (profileError) throw new Error(profileError.message);
                    return { announce, profile };
                })
            );

            return announcesWithProfiles;
        } catch (error) {
            throw error;
        }
    };

    return useQuery({ queryKey, queryFn });
}

export default useRecentAnnounceQuery;