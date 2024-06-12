import React from 'react';
import { Button } from './button';
import Image from 'next/image';

export default function Landing() {
    return (
        <div className='relative flex flex-col justify-center items-center space-y-5 w-full py-14'>
            <div className='text-xl font-bold capitalize flex flex-col items-center text-custom-dark-10 tablet:text-3xl desktop:text-5xl'>
                <span className="text-center">Trouvez des <strong className='uppercase text-custom-sky-50'>GP</strong> fiables pour vos envois</span>
                <span className="w-fit h-fil relative after:-z-50 after:bg-[url('/circle.svg')] after:top-1/2 after:bg-no-repeat after:content-[''] after:absolute after:left-1/2 after:w-full after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:h-full after:block after:bg-contain after:bg-center">
                    internationaux
                </span>
            </div>
            <p className='text-custom-dark-40 text-center'>publiez une annonce  ou trouvez un GP en quelques clis!</p>
            <Button className='bg-custom-sky-50 hover:bg-custom-sky-60'>Publier une annonce</Button>

            <Image width={300} height={100} src="/bg-3.svg" alt="bg3" className='absolute w-10 left-0 -top-5 -z-[100] tablet:left-[10%]' />
            <Image width={300} height={100} src="/bg-4.svg" alt="bg4" className='absolute w-10 right-0 top-1/4 -z-[100] tablet:right-[10%]' />
            <Image width={300} height={100} src="/bg-5.svg" alt="bg5" className='absolute w-10 right-1/4 bottom-0 -z-[100]' />
        </div>
    )
}