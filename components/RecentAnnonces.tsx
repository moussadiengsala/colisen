import React from 'react'
import Annonce from './ui/annonce'
import { createClient } from '@/utils/supabase/server';
import { AnnonceGetData } from '@/lib/annonces';
import clsx from 'clsx';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';


export default async function RecentAnnonces() {
    const supabase = createClient();
    const { data, error } = await supabase.from("annonce")
        .select("*").order("created_at", { ascending: false }).limit(3).returns<AnnonceGetData[]>();

    return (
        <div className='w-full flex justify-center items-center'>
            {!data ? 
                <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                    <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                        no annonce yet!
                    </div>
                </div>
                :
                <div className='flex flex-col gap-8 w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
                    <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                        {data.map(annonce => (
                            <>
                                <Annonce annonce={annonce} key={`annonce-${annonce.id}`}/>
                                <Annonce annonce={annonce} key={`annonce1-${annonce.id}`}/>
                                <Annonce annonce={annonce} key={`annonce2-${annonce.id}`}/>
                            </>
                        ))}
                    </div>
                    <Link className='flex justify-center items-center rounded-md gap-2 px-5 py-2 w-fit border-2 border-custom-dark-10 text-custom-dark-10 hover:border-custom-dark-40 hover:text-custom-dark-40' href="/annonce">
                        <span>plus d'annonces</span>
                        <ArrowRightIcon className='w-5 h-5' />
                    </Link>
                </div>
            }
        </div>
    )
}
