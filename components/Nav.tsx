// "use client"

// import React from 'react'
import AuthButton from './AuthButton'
import { Button } from './ui/button'
import MobileNavigation from './ui/mobilenavigation'
import Link from 'next/link'
import { navigation } from '@/data'
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"


const navigtions: navigation[] = [
    {label: "annonces", href: "#"},
    {label: "suivi des colis", href: "#"},
    {label: "contact", href: "#"},
]

export default function Nav() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
                <Button asChild className='bg-transparent text-custom-dark-10 hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                    <Link href="/">Colisen</Link>
                </Button>
        
                <div className='hidden tablet:flex '>
                    <div className='space-x-4 flex'>
                        <div className='space-x-2 flex'>
                            {navigtions.map(nav => (
                                    <Button asChild key={`${nav.label}desktop`} className="text-custom-dark-10 hover:text-custom-dark-40 bg-transparent hover:bg-transparent">
                                        <Link href={nav.href} className='w-full h-full p-4'>
                                            {nav.label}
                                        </Link>
                                    </Button>
                            ))}
                        </div>
                        <AuthButton />
                    </div>
                </div>

                <div className="tablet:hidden">
                    <MobileNavigation navigations={navigtions}/>
                </div>
            </div>
        </nav>
    )
}
