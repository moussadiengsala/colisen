
"use client";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAvatarProfile from '@/lib/get-user-profile';

const DynamicAvatarProfile = ({ userid }: { userid: string }) => {
    const [avatarUrl, _] = useAvatarProfile(userid);

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