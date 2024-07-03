
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { DatePickerWithRange } from './ui/date-picker-with-range';
import Image from 'next/image';

import Landing from './ui/landing';
// import { QuickSearch } from './ui/search';

export default function Header() {
  return (
    <div className="flex justify-center w-full desktop:min-h-screen">
      <div className='flex flex-col items-center w-full max-w-7xl p-3 pb-14 text-sm space-y-10 desktop:justify-around relative desktop:pb-0 border-2 border-b-custom-dark-60'>
        <Landing />
        {/* <QuickSearch /> */}
      </div>
    </div>
  );
}
