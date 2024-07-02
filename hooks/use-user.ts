import { getUserById } from "@/data/queries/get-user";
import useSupabase from "./use-supabase";
import { useQuery } from "@tanstack/react-query";

function useUserQuery() {
    const client = useSupabase();
    const queryKey = ['user', 'session'];

    const queryFn = async () => {
        try {
            const { data, error } = await client.auth.getSession();

            if (error) throw new Error(error.message);
            if (!data.session) throw new Error("no session found");

            const userId = data.session.user.id;
            const profile = await getUserById(client, userId);

            if (profile.error) throw new Error(profile.error.message);

            return {
                profile: profile.data,
                email: data.session.user.email,
            };
        } catch (error) {
            throw error;
        }
    };

    return useQuery({ queryKey, queryFn });
}

export default useUserQuery;
