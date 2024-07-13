"use client"
import React, { Fragment } from 'react'
import { Popover, Transition } from "@headlessui/react"
import { navigation } from '@/data'
import Link from 'next/link'
import Socialmedia from './socialmedia'
import { Button } from './button'
import AuthButton from '../AuthButton'
import clsx from 'clsx'
import { User } from '@/types/user'
import { isError } from 'util'
import { Skeleton } from './skeleton'

function MobileNavIcon({ open }: { open: boolean }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
            d="M0 1H14M0 7H14M0 13H14"
            className={clsx(
                'origin-center transition',
                open && 'scale-90 opacity-0',
            )}
            />
            <path
            d="M2 2L12 12M12 2L2 12"
            className={clsx(
                'origin-center transition',
                !open && 'scale-90 opacity-0',
            )}
            />
        </svg>
    )
}

export function MobileNavLink({
        href,
        children,
    }: {
        href: string
        children: React.ReactNode
    }) {
    return (
        <Button asChild className='text-custom-dark-10 text-base font-semibold capitalize hover:text-custom-dark-40 bg-transparent hover:bg-transparent'>
            <Link href={href}>{children}</Link>
        </Button>
    )
}

type MobileNavigationProps = {
    navigations: navigation[]
}

export default function MobileNavigation({navigations} : MobileNavigationProps) {
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
                    <Popover.Overlay className="fixed inset-0 z-20 bg-[#03060d61]/20" />
                </Transition.Child>
                <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <Popover
                        as="div"
                        className="absolute inset-x-0 z-[100] mt-4 mx-2 flex origin-top flex-col justify-center items-center gap-4 rounded-md bg-white dark:bg-[#03060D] px-8 py-14 text-lg tracking-tight text-slate-900 dark:text-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-500 ease-in-out"
                    >
                        {
                            navigations.map(nav => (
                                <MobileNavLink href={nav.href} key={`${nav.label}mobile`}>
                                    {nav.label}
                                </MobileNavLink> 
                            ))
                        }

                        <AuthButton isMobile={true} />
                        <hr className="border-1 w-full border-custom-light-90" />
                        <div className="">
                            <Socialmedia isLabelNeeded={false} />
                        </div>
                    </Popover>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}
