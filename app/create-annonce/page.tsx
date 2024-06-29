
import React from 'react'
import { createClient } from "@/utils/supabase/server"
import CreateAnnonce from '@/components/create-announce'
import { createAnnonce } from '@/lib/create-announce'



export default async function Announce() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <CreateAnnonce createAnnonce={createAnnonce} user={user}/>
    )
}