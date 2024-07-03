"use client"
import React, { useEffect } from 'react'
import Annonce, { AnnonceSkeleton } from './ui/annonce'
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import useRecentAnnounceQuery from '@/hooks/use-recent-announce';


export default function RecentAnnonces() {
    const { 
        data, 
        isLoading, 
        isError 
    } = useRecentAnnounceQuery();

    return (
        <div className='w-full flex justify-center items-center'>
            {isLoading ? (
                <div className='flex flex-col gap-8 w-full max-w-lg tablet:w-3/4 desktop:w-full desktop:max-w-full'>
                    <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                        {Array.from({length: 3}, (_, i) => i).map( i => (
                            <AnnonceSkeleton key={`annonce-skelton-${i}`} />
                        ))}
                    </div>
                </div>
            ) : isError || !data || data.length == 0 ? (
                    <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                        <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                            no annonce yet!
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-8 w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
                        <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                            {data.map(annonce => (<Annonce annonce={annonce} key={`annonce-${annonce.announce.id}`} />))}
                        </div>
                        <Link className='flex justify-center items-center rounded-md gap-2 px-5 py-2 w-fit border-2 border-custom-dark-10 text-custom-dark-10 hover:border-custom-dark-40 hover:text-custom-dark-40' href="/annonce">
                            <span>plus d'annonces</span>
                            <ArrowRightIcon className='w-5 h-5' />
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
