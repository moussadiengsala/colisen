import useSupabase from "./use-supabase";
import { useQuery } from "@tanstack/react-query";
import { getRecentAnnounce } from "@/data/queries/get-recent-announce";
import { getUserById } from "@/data/queries/get-user";
import { getAnnounceByID } from "@/data/queries/get-announce-by-id";

function useAnnounceByIDQuery(announce_id: string) {
    const client = useSupabase();
    const queryKey = ['single-announce', announce_id];

    const queryFn = async () => {
        try {
            const { data: announce, error } = await getAnnounceByID(client, announce_id);
            if (error) throw new Error(error.message);

            const { data: profile, error: profileError } = await getUserById(client, announce.user_id);
            if (profileError) throw new Error(profileError.message);

            return { announce, profile };;
        } catch (error) {
            throw error;
        }
    };

    return useQuery({ queryKey, queryFn });
}

export default useAnnounceByIDQuery;