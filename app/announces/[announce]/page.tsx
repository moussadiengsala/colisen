"use client"

import Annonce, { AnnonceSkeleton, SingleAnnonce } from '@/components/ui/annonce'
import useAnnounceByIDQuery from '@/hooks/use-announce-by-id'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Page() {
    const {announce} = useParams() as { announce: string }
    const { 
        data, 
        isLoading, 
        isError 
    } = useAnnounceByIDQuery(announce)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="flex justify-center w-full py-10">
            <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative">
            {isLoading ? (
                <div className='flex flex-col justify-center items-center gap-8 w-full max-w-lg tablet:w-3/4 desktop:w-full desktop:max-w-full'>
                    <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4 desktop:max-w-3xl">
                        <AnnonceSkeleton />
                    </div>
                </div>
            ) : isError || !data ? (
                    <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                        <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                            Nous nous excusons cette annonce semble ne pas exister.
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-8 w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
                        <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4 desktop:max-w-3xl">
                            <SingleAnnonce annonce={data}  />
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
