"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { InfoLog } from "@/components/ui/info-log"
import { SubmitButton } from "@/components/ui/submit-button"
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import SelectCountry from '@/components/ui/country-select'
import { Calendar, CircleAlert } from 'lucide-react'
import { DatePickerWithPresets } from '@/components/ui/date-pickerWith-presets'
import { WeightUnitSelect } from '@/components/ui/select-weight'
import { CurrencySelect } from '@/components/ui/select-currency'
import { AnnoncePostData, AnnonceSchema } from '@/types/annonces'
import { z } from 'zod'
import { validateAnnonceData } from '@/lib/validation-announce'
import { isValid } from 'date-fns'


export default function CreateAnnonce({ createAnnonce, user }: {    createAnnonce: (annonceData: AnnoncePostData, user: any) => Promise<void>; user: any }) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (formData: FormData) => {
        // event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        const entries = Object.fromEntries(formData.entries()) as { [key: string]: string };

        try {
            const {isValid, errors, data} = validateAnnonceData(entries);
            if (!isValid) {
                setErrors(errors || {});
                return;
            }

            // You can perform validation here if needed before calling the server function
            await createAnnonce(data as AnnoncePostData, user);
            setErrors({success: 'Votre est créer avec succès!'})
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred' });
        }
    };

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <div className="flex items-center justify-center my-auto w-full max-w-7xl px-3 py-10 text-sm space-y-10 desktop:justify-around relative">
            <Card className="mx-auto w-full desktop:w-fit">
                <CardHeader>
                    <CardTitle className="text-2xl">Annonce</CardTitle>
                    <CardDescription>
                        Creer une annonce pour votre prochaine colis
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" method='post'>
                        <div>
                            <SelectCountry 
                                    name="origine" 
                                    label='Lieu collect des colis' 
                                    classNameContent="flex flex-col p-2 gap-2 desktop:flex-row"
                                    classNameCard='p-4 gap-2'
                                />
                            <div className='flex flex-col'>
                                {
                                    Object.entries(errors || {}).filter((item) => item[0].includes("origin")).map((item) => (
                                        <span key={`origin-${item[0]}`} className='text-red-500 mt-1'>
                                            {item[1]}
                                        </span>
                                ))}
                            </div>
                        </div>
                        <div className='mb-2'>
                            <SelectCountry 
                                name="destination" 
                                label='Destination des colis' 
                                classNameContent="flex flex-col p-2 gap-2 desktop:flex-row" 
                                classNameCard='p-4 gap-2'
                            />
                            <div className='flex flex-col'>
                                {
                                    Object.entries(errors || {}).filter((item) => item[0].includes("destination")).map((item) => (
                                        <span key={`destination-${item[0]}`} className='text-red-500 mt-1'>
                                            {item[1]}
                                        </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className='flex flex-col gap-2 desktop:flex-row'>
                                <div className="grid gap-2 flex-1">
                                    <Label>Date depart prévue</Label>
                                    <DatePickerWithPresets name="departure-date"/>
                                </div>
                                <div className="grid gap-2 flex-1">
                                    <Label>Date d&apos;arrivée prévue</Label>
                                    <DatePickerWithPresets name="arrival-date"/>
                                </div>
                                <div className="grid gap-2 flex-1">
                                    <Label>Date limite de dépôt</Label>
                                    <DatePickerWithPresets name='limit-date' />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                {
                                    Object.entries(errors || {}).filter((item) => item[0].includes("date")).map((item) => (
                                        <span key={`date-${item[0]}`} className='text-red-500 mt-1'>
                                            {item[1]}
                                        </span>
                                ))}
                            </div>
                        </div>

                        <div className='flex justify-center items-center gap-2'>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="total-weight" className='flex items-center gap-2'>
                                    <span>Poids Total</span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleAlert className='w-5 h-5'/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Le poids total que vous pouvez transporter <br/> pour ce voyage ou qui vous reste.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Input
                                    id="total-weight"
                                    type="number"
                                    name="total-weight"
                                    placeholder="Ex: 1800"
                                    required
                                />
                            </div>
                            <WeightUnitSelect name="weight-unit" label='Unité du poids total'/>
                        </div>

                        <div className='flex gap-2'>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="price-weight" className='flex items-center gap-2'>
                                    <span>price</span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleAlert className='w-5 h-5'/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Le prix unitaire pour chaque unité de poids (kg, g, etc.).
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Input
                                    id="price-weight"
                                    type="number"
                                    name="price-weight"
                                    placeholder="Ex: 18"
                                    required
                                />
                            </div>
                            <WeightUnitSelect name="weight-unit-price" label='Unité de poids par prix'/>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">Informations importantes sur ce colis.</Label>
                            <Textarea placeholder="Entrez votre description ici.    " id="description" name="description" />
                        </div>
                        <SubmitButton formAction={handleSubmit} className="w-full" pendingText="Creation..." >
                            Creér
                        </SubmitButton>
                    </form>
                    <div className='flex flex-col'>
                        { errors.general && 
                            <InfoLog message={errors.general} error={true} />
                        }
                    </div>
                    <div className='flex flex-col'>
                        { errors.success && 
                            <InfoLog message={errors.success} error={false} />
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


/**
 * 
Object { description: "Description is required.", "origin.country": "Origine country is required.", "origin.state": "Origine state is required.", "origin.city": "Origine city is required.", "destination.country": "Destination country is required.", "destination.state": "Destination state is required.", "destination.city": "Destination city is required.", "date.departure": "Departure date is required.", "date.arrival": "Arrival date is required.", "date.limit": "Limit date is required." }
 */