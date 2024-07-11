"use client"
import React, { useEffect } from 'react'
import AuthButton from './AuthButton'
import { Button } from './ui/button'
import MobileNavigation from './ui/mobilenavigation'
import Link from 'next/link'
import { navigation } from '@/data'
import useUserQuery from '@/hooks/use-user'
import { Skeleton } from './ui/skeleton'
import { PackageOpenIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const navigtions: navigation[] = [
    {label: "annonces", href: "/annonce"},  
]

export default function Nav() {
    const { 
        data, 
        isLoading, 
        isError 
    } = useUserQuery();

    const pathUrl = usePathname();
    const isAuthPage = pathUrl.startsWith('/auth/');

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
                {isAuthPage ? (
                        <Button asChild className='bg-transparent hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                            <Link href="/" className='flex gap-2 items-center'>
                                <PackageOpenIcon className='text-blue-900'/>
                                <span className='text-orange-500'>Colisen</span>
                            </Link>
                        </Button>
                    ):(
                        <>
                            {isLoading ? 
                                (<Skeleton className="h-4 w-[100px]" />) :
                                (
                                    <Button asChild className='bg-transparent hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                                        <Link href="/" className='flex gap-2 items-center'>
                                            <PackageOpenIcon className='text-blue-900'/>
                                            <span className='text-orange-500'>Colisen</span>
                                        </Link>
                                    </Button>
                                )
                            }
                            
                    
                            <div className='hidden tablet:flex '>
                                <div className='space-x-4 flex'>
                                    <div className='space-x-2 flex items-center'>
                                        {isLoading ? (
                                            navigtions.map(nav => ( <Skeleton className="h-4 w-[100px]" key={`${nav.label}desktop`} /> ))
                                        ): (
                                                navigtions.map(nav => (
                                                    <Button asChild key={`${nav.label}desktop`} className="text-custom-dark-10 text-sm font-semibold capitalize hover:text-custom-dark-40 bg-transparent hover:bg-transparent">
                                                        <Link href={nav.href} className='w-full h-full p-4'>
                                                            {nav.label}
                                                        </Link>
                                                    </Button>
                                                ))
                                            )
                                        }
                                    </div>
                                    <AuthButton isMobile={false} data={{user: data, isLoading, isError}}/>
                                </div>
                            </div>

                            <div className="tablet:hidden">
                                <MobileNavigation navigations={navigtions} data={{
                                    user: data,
                                    isLoading,
                                    isError
                                }} />
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    )
}
