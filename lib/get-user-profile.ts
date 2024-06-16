import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const useAvatarProfile = (userid: string) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        let ignore = false;

        async function getProfile() {
            const { data, error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', userid)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    if (data.avatar_url) {
                        downloadImage(data.avatar_url);
                    }
                }
            }
        }

        getProfile();
        return () => {
            ignore = true;
        };
    }, [userid, supabase]);

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error);
        }
    }

    return [avatarUrl, setAvatarUrl] as const;
};

export default useAvatarProfile;
