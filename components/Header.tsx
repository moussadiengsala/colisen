
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { DatePickerWithRange } from './ui/dateoicker';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import Landing from './ui/landing';

export default function Header() {
  return (
    <div className="flex justify-center w-full desktop:min-h-screen">
      <div className='flex flex-col items-center w-full max-w-7xl p-3 pb-14 text-sm space-y-10 desktop:justify-around relative desktop:pb-0 border-2 border-b-custom-dark-60'>
        <Landing />

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
      </div>
    </div>
  );
}
