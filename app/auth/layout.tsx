
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function layout({
        children,
    }: {
        children: React.ReactNode;
    }) {
    return (
        <div className='w-full'>
            <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
                    <Button asChild className='bg-transparent text-custom-dark-10 hover:bg-transparent font-extrabold text-xl desktop:text-2xl'>
                        <Link href="/">Colisen</Link>
                    </Button>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
                    {children}
                </div>
            </div>
        </div>
    )
}
