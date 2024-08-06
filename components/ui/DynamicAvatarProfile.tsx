
"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSupabase from '@/hooks/use-supabase';

const DynamicAvatarProfile = ({ avatar_url }: { avatar_url: string | null }) => {
    const client = useSupabase();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        let url: string | null = null;

        const fetchAvatar = async () => {
            if (avatar_url) {
                try {
                    const { data, error } = await client.storage.from('avatars').download(avatar_url);
                    if (error) {
                        throw error;
                    }
                    url = URL.createObjectURL(data);
                    setAvatarUrl(url);
                } catch (error) {
                    setAvatarUrl(null);
                }
            }
        };

        fetchAvatar();

        // Cleanup URL object when component unmounts or when a new URL is set
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [avatar_url, client]);

    return (
        <Avatar>
            {avatarUrl ? (
                <>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </>
            ) : (
                <AvatarFallback>CN</AvatarFallback>
            )}
        </Avatar>
    );
};

export default DynamicAvatarProfile;