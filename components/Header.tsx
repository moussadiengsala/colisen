
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import Image from 'next/image';

import { QuickSearch } from './ui/search';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-center w-full desktop:min-h-screen">
      <div className='flex flex-col items-center w-full max-w-7xl p-3 pb-14 text-sm space-y-10 desktop:justify-around relative desktop:pb-0 border-b-2 border-b-custom-dark-60/20'>
        <div className='relative flex flex-col justify-center items-center space-y-5 w-full py-14'>
            <div className='text-xl font-bold capitalize flex flex-col items-center text-blue-900 tablet:text-3xl desktop:text-5xl'>
                <span className="text-center">Trouvez des <strong className='text-orange-500'>GP</strong> fiables pour vos envois</span>
                <span className='text-orange-500'>
                    internationaux
                </span>
            </div>
            <p className='text-custom-dark-40 text-base text-center'>publiez une annonce  ou trouvez un GP en quelques clis!</p>
            <Button className='bg-custom-dark-10 hover:bg-custom-dark-40 font-semibold'>
                <Link href="create-annonce" className='w-full h-full'>Publier une annonce</Link>
            </Button>

            <Image width={300} height={100} src="/bg-3.svg" alt="bg3" className='absolute w-10 left-0 -top-5 -z-[100] tablet:left-[10%]' />
            <Image width={300} height={100} src="/bg-4.svg" alt="bg4" className='absolute w-10 right-0 top-1/4 -z-[100] tablet:right-[10%]' />
            <Image width={300} height={100} src="/bg-5.svg" alt="bg5" className='absolute w-10 right-1/4 bottom-0 -z-[100]' />
        </div>
        <QuickSearch />
      </div>
    </div>
  );
}


// className="w-fit h-fit text-orange-500 relative after:-z-50 after:bg-[url('/circle.svg')] after:top-1/2 after:bg-no-repeat after:content-[''] after:absolute after:left-1/2 after:w-full after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:h-full after:block after:bg-contain after:bg-center"