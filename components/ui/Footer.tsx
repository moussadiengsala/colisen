import React from 'react'
import Socialmedia from './socialmedia'
import { Button } from './button'
import Link from 'next/link'
import { FacebookIcon, PhoneIcon } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center items-center text-center text-xs">
            <div className='w-full max-w-7xl p-3 text-sm'>
                <div className='flex flex-col-reverse gap-4 tablet:gap-0 tablet:flex-row justify-between items-center w-full'>
                    <p>2024 <strong>Colisen</strong>. Tous droits réservés.</p>
                    <div className='flex flex-col gap-2'>
                        <Button asChild className='bg-transparent hover:bg-transparent text-custom-dark-40 hover:text-custom-dark-60 font-semibold p-0'>
                            <Link href="#" className='flex gap-2 items-center'>
                                <FacebookIcon />
                                <span>Visite our page facebook</span>
                            </Link>
                        </Button>
                        <div className='flex gap-2 items-center text-custom-dark-40 hover:text-custom-dark-60 font-semibold'>
                            <PhoneIcon />
                            <span>+221 78 000 00 00</span>
                        </div>
                        <div className='flex gap-2 items-center text-custom-dark-40 hover:text-custom-dark-60 font-semibold'>
                            <PhoneIcon />
                            <span>+221 70 000 00 00</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
