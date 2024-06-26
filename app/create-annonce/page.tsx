import React from 'react'
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
import { AnnoncePostData, AnnonceSchema } from '@/lib/annonces'
import { z } from 'zod'



export default async function CreateAnnonce() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const createAnnonce = async (formData: FormData) => {
        "use server";
        const entries = Object.fromEntries(formData.entries()) as { [key: string]: string };

        const annonceData: AnnoncePostData = {
            description: entries["description"],
            origin: {
                country: entries["origine-country"],
                state: entries["origine-state"],
                city: entries["origine-city"],
            },
            destination: {
                country: entries["destination-country"],
                state: entries["destination-state"],
                city: entries["destination-city"],
            },
            date: {
                departure: entries["departure-date"],
                arrival: entries["arrival-date"],
                limit: entries["limit-date"],
            },
            weight: {
                total: entries["total-weight"],
                unit: entries["weight-unit"],
            },
            pricing: {
                price: entries["price-weight"],
                weightUnit: entries["weight-unit-price"],
                currency: entries["currency"],
            },
        };

        const supabase = createClient();
        const { error } = await supabase
        .from('annonce')
        .insert({ 
            description: annonceData.description,
            user_id : user?.id as string,

            origin_country: annonceData.origin.country,
            origin_state: annonceData.origin.state,
            origin_city: annonceData.origin.country,

            destination_country: annonceData.destination.country,
            destination_state: annonceData.destination.state,
            destination_city: annonceData.destination.country,

            departure_date: annonceData.date.departure,
            arrival_date: annonceData.date.arrival,
            limit_depot: annonceData.date.limit,

            total_weight: annonceData.weight.total,
            total_weight_unit: annonceData.weight.unit,

            price_amount: annonceData.pricing.price,
            price_currency: annonceData.pricing.currency,
            price_unit: annonceData.pricing.weightUnit
        })


        console.log("-------------------------------------", error)
    }

    return (
        <Card className="card-dimensions">
            <CardHeader>
                <CardTitle className="text-2xl">Annonce</CardTitle>
                <CardDescription>
                    Creer une annonce pour votre prochaine colis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    <SelectCountry name="origine" title="Pays d'origine" />
                    <SelectCountry name="destination" title="Pays de destination" />

                    <div className="grid gap-2">
                        <Label>Date depart prévue</Label>
                        <DatePickerWithPresets name="departure-date"/>
                    </div>
                    <div className="grid gap-2">
                        <Label>Date d'arrivée prévue</Label>
                        <DatePickerWithPresets name="arrival-date"/>
                    </div>
                    <div className="grid gap-2">
                        <Label>Date limite de dépôt</Label>
                        <DatePickerWithPresets name='limit-date' />
                    </div>
                    <div className='grid grid-row-2 gap-2 desktop:grid-cols-2 desktop:grid-rows-1'>
                        <div className="grid gap-2">
                            <Label htmlFor="total-weight" className='flex items-center gap-2'>
                                <span>Poids Total</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CircleAlert className='w-5 h-5'/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Le poids total que vous pouvez transporter pour ce voyage ou qui vous reste.
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
                    <div className='grid grid-row-3 gap-2 desktop:grid-cols-3 desktop:grid-rows-1'>
                        <div className="grid gap-2">
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
                        <CurrencySelect name="currency" label="Devise" />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description">Informations importantes sur ce colis.</Label>
                        <Textarea placeholder="Entrez votre description ici.    " id="description" name="description" />
                    </div>
                    <SubmitButton formAction={createAnnonce} className="w-full" pendingText="Connexion..." >
                        Connexion
                    </SubmitButton>
                </form>
            </CardContent>
        </Card>
    )
}


/**
 * const [errors, setErrors] = useState<{ [key: string]: string }>({});
 * const createAnnonce = async (formData: FormData) => {
        // "use server";
        const entries = Object.fromEntries(formData.entries()) as { [key: string]: string };

        const annonceData: AnnonceData = {
            description: entries["description"],
            origine: {
                country: entries["origine-country"],
                state: entries["origine-state"],
                city: entries["origine-city"],
            },
            destination: {
                country: entries["destination-country"],
                state: entries["destination-state"],
                city: entries["destination-city"],
                date: entries["destination-date"],
                limitDate: entries["limit-date"],
            },
            weight: {
                total: entries["total-weight"],
                unit: entries["weight-unit"],
            },
            pricing: {
                price: entries["price-weight"],
                weightUnit: entries["weight-unit-price"],
                currency: entries["currency"],
            },
        };

        try {
            const validationResult = AnnonceSchema.parse(annonceData);
            setErrors({});
        } catch (e) {
            if (e instanceof z.ZodError) {
                const formErrors: { [key: string]: string } = {};
                e.errors.forEach((error: z.ZodIssue) => {
                    const key = error.path.join('.');
                    formErrors[key] = error.message;
                });
                setErrors(formErrors);
            }
        }
    }
 <Card className="card-dimensions">
            <CardHeader>
                <CardTitle className="text-2xl">Annonce</CardTitle>
                <CardDescription>
                    Créer une annonce pour votre prochain colis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    createAnnonce(formData);
                }}>
                    <div className="grid gap-2">
                        <Label>Pays d'origine</Label>
                        <SelectCountry name="origine-country" />
                        {errors["origine.country"] && <p className="text-red-500">{errors["origine.country"]}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label>Pays de destination</Label>
                        <SelectCountry name="destination-country" />
                        {errors["destination.country"] && <p className="text-red-500">{errors["destination.country"]}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label>Date d'arrivée prévue</Label>
                        <DatePickerWithPresets name="destination-date"/>
                        {errors["destination.date"] && <p className="text-red-500">{errors["destination.date"]}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label>Date limite de dépôt</Label>
                        <DatePickerWithPresets name='limit-date' />
                        {errors["destination.limitDate"] && <p className="text-red-500">{errors["destination.limitDate"]}</p>}
                    </div>
                    <div className='grid grid-row-2 gap-2 desktop:grid-cols-2 desktop:grid-rows-1'>
                        <div className="grid gap-2">
                            <Label htmlFor="total-weight" className='flex items-center gap-2'>
                                <span>Poids Total</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CircleAlert className='w-5 h-5'/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Le poids total que vous pouvez transporter pour ce voyage ou qui vous reste.
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
                            {errors["weight.total"] && <p className="text-red-500">{errors["weight.total"]}</p>}
                        </div>
                        <WeightUnitSelect name="weight-unit" label='Unité du poids total'/>
                        {errors["weight.unit"] && <p className="text-red-500">{errors["weight.unit"]}</p>}
                    </div>
                    <div className='grid grid-row-3 gap-2 desktop:grid-cols-3 desktop:grid-rows-1'>
                        <div className="grid gap-2">
                            <Label htmlFor="price-weight" className='flex items-center gap-2'>
                                <span>Prix</span>
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
                            {errors["pricing.price"] && <p className="text-red-500">{errors["pricing.price"]}</p>}
                        </div>
                        <WeightUnitSelect name="weight-unit-price" label='Unité de poids par prix'/>
                        {errors["pricing.weightUnit"] && <p className="text-red-500">{errors["pricing.weightUnit"]}</p>}
                        <CurrencySelect name="currency" label="Devise" />
                        {errors["pricing.currency"] && <p className="text-red-500">{errors["pricing.currency"]}</p>}
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description">Informations importantes sur ce colis.</Label>
                        <Textarea placeholder="Entrez votre description ici." id="description" name="description" />
                        {errors["description"] && <p className="text-red-500">{errors["description"]}</p>}
                    </div>
                    <SubmitButton formAction={createAnnonce} className="w-full" pendingText="Connexion..." >
                        Connexion
                    </SubmitButton>
                </form>
                {searchParams?.message && (
                    <InfoLog message={searchParams.message} error={searchParams.iserror} />
                )}
            </CardContent>
        </Card>
 */