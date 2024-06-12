"use client"

import React from 'react'
import DeployButton from './DeployButton'
import AuthButton from './AuthButton'
import { Button } from './ui/button'
import MobileNavIcon from './ui/mobilenavicon'
import { Popover, Transition } from "@headlessui/react"
import MobileNavigation from './ui/mobilenavigation'
import Link from 'next/link'
import { navigation } from '@/data'
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
        
                <NavigationMenu className='hidden tablet:block'>
                    <NavigationMenuList className='space-x-4'>
                        <div className='space-x-2'>
                            {navigtions.map(nav => (
                                <Link href={nav.href} key={`${nav.label}desktop`} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {nav.label}
                                    </NavigationMenuLink>
                                </Link>
                            ))}
                        </div>
                        {/* <div className='flex gap-2'>
                            <Button asChild className='px-4 bg-custom-sky-50 hover:bg-custom-sky-60'>
                                <Link href="#">Connexion</Link>
                            </Button>
                            <Button asChild className='px-4 hover:bg-custom-dark-40'>
                                <Link href="#">Inscription</Link>
                            </Button>
                        </div> */}
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="tablet:hidden">
                    <MobileNavigation navigations={navigtions}/>
                </div>
            </div>
        </nav>
    )
}
