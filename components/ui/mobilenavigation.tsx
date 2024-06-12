"use client"

import React, { Fragment } from 'react'
import MobileNavIcon from './mobilenavicon'
import { Popover, Transition } from "@headlessui/react"
import { navigation } from '@/data'
import Link from 'next/link'
import Socialmedia from './socialmedia'
import { Button } from './button'

function MobileNavLink({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
return (
    <Button asChild className='bg-transparent text-custom-dark-10 hover:bg-transparent hover:text-custom-dark-40 font-medium text-xl'>
        <Link href={href}>{children}</Link>
    </Button>
)
}

export default function MobileNavigation({navigations} : {navigations: navigation[]}) {
    return (
        <Popover>
            <Popover.Button
                className="relative z-[100] flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                aria-label="Toggle Navigation"
                >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Popover.Overlay className="fixed inset-0 z-10 bg-[#03060d61]/20" />
                </Transition.Child>
                <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <Popover.Panel
                    as="div"
                    className="absolute inset-x-0 z-[100] mt-4 mx-2 flex origin-top flex-col justify-center items-center gap-4 rounded-md bg-white dark:bg-[#03060D] px-8 py-14 text-lg tracking-tight text-slate-900 dark:text-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-500 ease-in-out"
                    >
                    {navigations.map(nav => (
                        <Popover.Button key={`${nav.label}mobile`}>
                            <MobileNavLink href={nav.href}>
                                {nav.label}
                            </MobileNavLink> 
                        </Popover.Button>
                    )
                    )}

                    <div className='flex flex-col gap-4'>
                        <Button asChild className='px-8 bg-custom-sky-50 hover:bg-custom-sky-60'>
                            <Link href="#">Connexion</Link>
                        </Button>
                        <Button asChild className='px-8 hover:bg-custom-dark-40'>
                            <Link href="#">Inscription</Link>
                        </Button>
                    </div>
                    
                    <hr className="border-1 w-full border-custom-light-90" />
                    <div className="">
                        <Socialmedia isLabelNeeded={false} />
                    </div>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}
