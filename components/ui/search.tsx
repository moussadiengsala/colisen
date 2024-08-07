"use client"
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './input'
import { CircleXIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { clsx } from "clsx";
import { Popover, Transition } from "@headlessui/react"
import { Button } from './button'
import Filter from './filter'
import { useRouter, useSearchParams } from 'next/navigation'
import throttle from '@/lib/throttle'
import { Label } from './label'

export function QuickSearch() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const origin = formData.get('origin') as string;
        const destination = formData.get('destination') as string;
        const currentParams = new URLSearchParams()
        if (origin) {
            currentParams.set('origin', origin);
        }
        if (destination) {
            currentParams.set('destination', destination);
        } 
        router.push(`/announces?${currentParams}`)
    }

    return (
        <Card className='bg-custom-light-98 rounded-md space-y-5 p-4 w-full max-w-lg desktop:max-w-full desktop:w-full desktop:flex-row desktop:space-y-0 desktop:space-x-5 desktop:p-8'>
            <CardHeader>
                <CardDescription>Trouver des command en cour</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <form method='get' onSubmit={handleSubmit} className='flex flex-col desktop:items-end gap-4 desktop:flex-row'>
                    <div className='flex-1 space-y-2'>
                        <Label htmlFor="search_origine">Origine</Label>
                        <Input type='text' id="search_origine" placeholder='Oringine...' name="origin"/>
                    </div>
                    <div className='flex-1 space-y-2'>
                        <Label htmlFor="search_destination">Destination</Label>
                        <Input type='text' id="search_destination" placeholder='Destination...' name="destination" />
                    </div>
                    <Button type='submit' className='bg-custom-dark-10 hover:bg-custom-dark-40 font-semibold'>Chercher</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function Search() {
    const [input, setInput] = useState<string>("")

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = useCallback(throttle((value: string) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        if (value !== "") {
            currentParams.set('q', value);
        } else {
            currentParams.delete('q');
        }
        router.replace(`/announces?${currentParams.toString()}`, {scroll: false});
    }, 500), [searchParams, router]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        handleChange(value);
    };

    useEffect(() => {
        const defaultValue = searchParams.get(`q`);
        if (defaultValue) {
            setInput(defaultValue)
        }
    }, [])

    return (
        <Card className='w-full bg-transparent mb-4'>
            <CardContent className='p-0'>
                <div className='flex gap-4 desktop:flex-row'>
                    <Input 
                        type="text"
                        placeholder="shearch..."
                        onChange={onInputChange}
                        className=""
                        value={input}
                    />

                    <Popover className="flex justify-center items-center desktop:hidden">
                        <Popover.Button
                            className="relative flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                            aria-label="Toggle Navigation"
                            >
                            <SlidersHorizontalIcon />
                        </Popover.Button>
                        <Transition.Root>
                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Popover.Overlay className="fixed inset-0 bg-[#03060d61]/20" />
                            </Transition.Child>
                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Popover.Panel
                                    as="div"
                                    className="absolute inset-x-0 z-50 mx-4 tablet:mx-10 flex origin-top flex-col justify-center items-center transform translate-y-1/2 rounded-md bg-white dark:bg-[#03060D] text-lg tracking-tight text-slate-900 dark:text-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-500 ease-in-out"
                                >
                                    <div className='flex flex-col w-full items-end p-4 space-y-4'>
                                        <Popover.Button
                                            className="relative flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                                            aria-label="Toggle Navigation"
                                            >
                                            <CircleXIcon className='hover:opacity-75'/>
                                        </Popover.Button>
                                        <Filter />
                                    </div>
                                </Popover.Panel>
                            </Transition.Child>
                        </Transition.Root>
                    </Popover>
                </div>
            </CardContent>
        </Card>
    )
}
