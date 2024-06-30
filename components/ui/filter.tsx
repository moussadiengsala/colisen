import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"
import SelectCountryStateCity from './country-select'
import { DatePickerWithPresets } from './date-pickerWith-presets'
import { DatePickerWithRange } from './date-picker-with-range'
import { CurrencySelect } from './select-currency'
import { WeightUnitSelect } from './select-weight'
import SelectPrices from './select-price'

export default function Filter() {

    return (
        <Card className='h-fit w-full desktop:w-fit'>
            <CardHeader>
                <CardDescription>Filter</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>Lieu collect des colis</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='flex flex-col gap-4 desktop:flex-row'>
                            <SelectCountryStateCity name="origin" classNameContent='flex flex-col p-4 gap-4 tablet:flex-row desktop:flex-col' classNameCard='w-full' isForFilter={true} />
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>Destination des colis</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='flex flex-col gap-4 desktop:flex-row'>
                            <SelectCountryStateCity name="destination" classNameContent='flex flex-col p-4 gap-4 tablet:flex-row desktop:flex-col' classNameCard='w-full' isForFilter={true} />
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>Date de départ</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className="grid gap-2">
                            <DatePickerWithRange name={'departure'} />
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>Date d&apos;arrivée</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className="grid gap-2">
                            <DatePickerWithRange name={'arrival'}  />
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>Date limit</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className="grid gap-2">
                            <DatePickerWithRange name={'limit'}  />
                        </div>
                    </CardContent>
                </Card>
                <Card className='bg-custom-light-98 rounded-md space-y-2 p-2'>
                    <CardHeader className='w-full p-2'>
                        <CardDescription className='font-bold'>le prix unitaire</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className="grid gap-2">
                            <SelectPrices />
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

/**
 * -unit-price" label='Unité de poids par prix'/>
                        <CurrencySelect name="currency" label="Devise" />
description: z.string().nonempty("Description is required."),

    pricing: z.object({
        price: z.string().nonempty("Price is required."),
        weightUnit: z.string().nonempty("Weight unit for price is required."),
        currency: z.string().nonempty("Currency is required."),
    }),
 */
