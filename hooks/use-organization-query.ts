import { getAnnounceById } from "@/data/queries/get-organization-by-id";
import useSupabase from "./use-supabase";
import { useQuery } from "@tanstack/react-query";

function useAnnounceQuery(announceId: number) {
    const client = useSupabase();
    const queryKey = ['announce', announceId];

    const queryFn = async () => {
        return getAnnounceById(client, announceId).then(
            (result) => result.data
        );
    };

    return useQuery({ queryKey, queryFn });
}

export default useAnnounceQuery;