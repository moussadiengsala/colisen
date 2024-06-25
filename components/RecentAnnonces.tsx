import React from 'react'
import Annonce from './ui/annonce'
import { createClient } from '@/utils/supabase/server';
import { AnnonceGetData } from '@/lib/annonces';
import clsx from 'clsx';


export default async function RecentAnnonces() {
    const supabase = createClient();
    const { data, error } = await supabase.from("annonce")
        .select("*").order("created_at", { ascending: false }).limit(3).returns<AnnonceGetData[]>();
        // data?.length != 3
        //{clsx("gap-4", true ? 
        // "flex flex-col justify-center items-center desktop:flex-row" :
        // "w-full grid grid-rows-3 desktop:grid-cols-3 desktop:grid-rows-1")}
    return (
        <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
            {!data ? 
                <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                    no annonce yet!
                </div>
            : data.map(annonce => (
                <>
                    <Annonce annonce={annonce} key={`annonce-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce1-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce2-${annonce.id}`}/>
                </>
            ))}
        </div>
    )
}
