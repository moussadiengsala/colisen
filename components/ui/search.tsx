"use client"
import React, { Fragment } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './input'
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { clsx } from "clsx";
import { Popover, Transition } from "@headlessui/react"
import { Button } from './button'
import Filter from './filter'



export function QuickSearch() {
    return (
        <Card className='bg-custom-light-98 rounded-md space-y-5 p-4 w-full max-w-lg desktop:max-w-full desktop:w-full desktop:flex-row desktop:space-y-0 desktop:space-x-5 desktop:p-8'>
            <CardHeader>
                <CardDescription>Trouver des command en cour</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <div className='flex flex-col gap-4 desktop:flex-row'>
                    <Input type='text' placeholder='Oringine...'/>
                    <Input type='text' placeholder='Destination...'/>
                    <Input type='number' placeholder='Weight'/>
                    <Button type='submit' className='bg-custom-sky-50 hover:bg-custom-sky-60'>Chercher</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function Search() {
    return (
        <Card className='w-full bg-transparent mb-4'>
            <CardContent className='p-0'>
                <div className='flex gap-4 desktop:flex-row'>
                    <Input 
                        type="text"
                        placeholder="shearch..."
                        className=""
                    />

                    <Popover className="flex justify-center items-center desktop:hidden">
                        <Popover.Button
                            className="relative z-[100] flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                            aria-label="Toggle Navigation"
                            >
                            <SlidersHorizontalIcon />
                        </Popover.Button>
                        <Transition.Root>
                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Popover.Overlay className="fixed inset-0 z-10 bg-[#03060d61]/20" />
                            </Transition.Child>
                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Popover.Panel
                                    as="div"
                                    className="absolute inset-x-0 z-[100] mt-4 mx-4 tablet:mx-10 flex origin-top flex-col justify-center items-center transform translate-y-1/2 rounded-md bg-white dark:bg-[#03060D] text-lg tracking-tight text-slate-900 dark:text-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-500 ease-in-out"
                                >
                                    <Filter />
                                </Popover.Panel>
                            </Transition.Child>
                        </Transition.Root>
                    </Popover>
                </div>
            </CardContent>
        </Card>
    )
}
