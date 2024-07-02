
"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSupabase from '@/hooks/use-supabase';

const DynamicAvatarProfile = ({ avatar_url }: { avatar_url: string | null }) => {
    const client = useSupabase();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(avatar_url);

    async function downloadImage(path: string) {
        try {
            const { data, error } = await client.storage.from('avatars').download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            setAvatarUrl(null)
        }
    }

    useEffect(() => {
        if (avatar_url) {
            downloadImage(avatar_url);
        } else {
            setAvatarUrl(null);
        }
    }, [avatar_url]);

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