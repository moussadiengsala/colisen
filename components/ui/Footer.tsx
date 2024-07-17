import React from 'react'
import Socialmedia from './socialmedia'
import { Button } from './button'
import Link from 'next/link'
import { FacebookIcon, PackageOpenIcon, PhoneIcon, TwitterIcon } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center items-center text-center text-xs">
            <div className='w-full max-w-7xl p-3 text-sm'>
                <div className='flex flex-col items-center w-full gap-10'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-center items-center gap-2 font-bold text-xl'>
                            <PackageOpenIcon className='text-blue-900'/>
                            <span className='text-orange-500'>Colisen</span>
                        </div>
                        <div>
                            <Button asChild className='bg-transparent hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                                    <Link href="/" className='flex gap-2 items-center'>
                                        <FacebookIcon className='text-blue-900'/>
                                    </Link>
                                </Button>
                                <Button asChild className='bg-transparent hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                                    <Link href="/" className='flex gap-2 items-center'>
                                        <TwitterIcon className='text-blue-900'/>
                                    </Link>
                                </Button>
                        </div>
                    </div>
                    <p>2024 <strong>Colisen</strong>. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
