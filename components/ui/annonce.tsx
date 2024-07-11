import React from 'react'
import {CircleAlert, PlaneLanding, PlaneTakeoff, MapPin, CalendarDays, Scale, CircleDollarSign, PhoneCallIcon} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"
import { Avatar, AvatarImage, AvatarFallback } from './avatar'
import { Badge } from './badge'
import { Separator } from './separator'
import { Button } from './button'
import { AnnonceGetData } from '@/types/annonces'
import DynamicAvatarProfile from './DynamicAvatarProfile'
import { format, parseISO } from 'date-fns'
import { Skeleton } from './skeleton'
import Link from 'next/link'

export default function Annonce({annonce} : {annonce: AnnonceGetData }) {
    return (
        <Card className='bg-custom-light-98 rounded-md w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
            <CardHeader>
                <div  className='flex items-center gap-2'>
                    <Avatar>
                        <DynamicAvatarProfile avatar_url={annonce.profile.avatar_url} /> 
                    </Avatar>
                    <div className='flex flex-col font-bold'>
                        <span>{annonce.profile.first_name}</span>
                        <span>{annonce.profile.last_name}</span>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-2'>
                    <div className='flex flex-col gap-2 tablet:flex-row desktop:flex-col'>
                        <Card className='flex flex-col items-center flex-1'>
                            <CardHeader className='w-full flex flex-row items-center gap-2 px-4 py-2'>
                                <PlaneLanding />
                                <CardTitle className='font-light text-base'>
                                    <p className='text-custom-dark-40'>Lieu de collect des colis et le date de départ.</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex w-full px-4 py-2'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-4'>
                                        <MapPin />
                                        <div className=''>
                                            <p>{annonce.announce.origin_country} {annonce.announce.origin_state} {annonce.announce.origin_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.announce.departure_date as string), 'EEE MMM dd yyyy')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='flex flex-col items-center flex-1'>
                            <CardHeader className='w-full flex flex-row items-center gap-2 px-4 py-2'>
                                <PlaneLanding />
                                <CardTitle className='font-light text-base'>
                                    <p className='text-custom-dark-40 text-base font-medium'>La destination du colis et le date d'arrivée prévu.</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex w-full px-4 py-2'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-4'>
                                        <MapPin />
                                        <div className=''>
                                            <p>{annonce.announce.destination_country} {annonce.announce.destination_state} {annonce.announce.destination_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.announce.departure_date as string), 'EEE MMM dd yyyy')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Badge variant="outline" className='p-4 flex gap-2 rounded-md'>
                        <CircleAlert />
                        <div className="flex justify-center gap-2">
                            <span>Limit depot</span>
                            <span>{format(parseISO(annonce.announce.limit_depot as string), 'EEE MMM dd yyyy')}</span>
                        </div>
                    </Badge>
                    <Card className=''>
                        <CardHeader>
                            <CardTitle className='font-light text-base'>Tarification</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                                <div className='flex items-center gap-2'>
                                    <CircleDollarSign />
                                    <span>{annonce.announce.price_amount}CFA par {annonce.announce.price_unit}</span>
                                </div>
                        </CardContent>
                    </Card>
                
                <Button asChild type='submit' className='bg-custom-dark-10 font-semibold hover:bg-custom-dark-40 w-full'>
                    <Link href={`https://wa.me/221783813411?text=${"hello"}`}>Consulter</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
// https://wa.me/<phone_number>?text=<custom_message>

export function AnnonceSkeleton() {
    return (
        <Card className='bg-custom-light-98 rounded-md w-[90vw] tablet:w-full desktop:max-w-full desktop:flex-1'>
            <CardHeader className=''>
                <div className='w-full flex items-center justify-between'>
                    <div  className='flex items-center gap-2'>
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className='flex flex-col gap-1'>
                            <Skeleton className='w-20 h-4' />
                            <Skeleton className='w-20 h-4' />
                        </div>
                    </div>
                    <Skeleton className='w-24 h-4' />
                </div>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-8'>
                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-col gap-1'>
                        <Skeleton className='w-full h-4' />
                        <Skeleton className='w-full h-4' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Skeleton className='w-full h-4' />
                        <Skeleton className='w-full h-4' />
                    </div>
                </div>
                <Skeleton className='w-full h-4' />
                <div className='space-y-2'>
                    <Skeleton className='w-full h-4' />
                    <div className='ml-4 space-y-2'>
                        <Skeleton className='w-full h-4' />
                        <Skeleton className='w-full h-4' />
                    </div>
                </div>
                <Skeleton className='w-full h-12' />
            </CardContent>
        </Card>
    )
}


/**
 export default function Annonce({annonce} : {annonce: AnnonceGetData }) {
    return (
        <Card className='bg-custom-light-98 rounded-md w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
            <CardHeader>
                <div className='w-full flex items-center justify-between'>
                    <div  className='flex items-center gap-2'>
                        <Avatar>
                            <DynamicAvatarProfile avatar_url={annonce.profile.avatar_url} /> 
                        </Avatar>
                        <div className='flex flex-col'>
                            <span>{annonce.profile.first_name}</span>
                            <span>{annonce.profile.last_name}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PhoneCallIcon className='w-5 h-5'/>
                        <span>+{annonce.profile.telephone}</span>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-2'>
                    <div className='flex flex-col gap-2 tablet:flex-row desktop:flex-col'>
                        <Card className='flex flex-col items-center flex-1'>
                            <CardHeader className='w-full flex flex-row items-center gap-2 px-4 py-2'>
                                <PlaneLanding />
                                <CardTitle className='font-light text-base'>
                                    <p className='text-custom-dark-40'>Lieu de collect des colis et le date de départ.</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex w-full px-4 py-2'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-4'>
                                        <MapPin />
                                        <div className=''>
                                            <p>{annonce.announce.origin_country} {annonce.announce.origin_state} {annonce.announce.origin_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.announce.departure_date as string), 'EEE MMM dd yyyy')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='flex flex-col items-center flex-1'>
                            <CardHeader className='w-full flex flex-row items-center gap-2 px-4 py-2'>
                                <PlaneLanding />
                                <CardTitle className='font-light text-base'>
                                    <p className='text-custom-dark-40 text-base font-medium'>La destination du colis et le date d'arrivée prévu.</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex w-full px-4 py-2'>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-4'>
                                        <MapPin />
                                        <div className=''>
                                            <p>{annonce.announce.destination_country} {annonce.announce.destination_state} {annonce.announce.destination_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.announce.departure_date as string), 'EEE MMM dd yyyy')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Badge variant="outline" className='p-4 flex gap-2 rounded-md'>
                        <CircleAlert />
                        <div className="flex justify-center gap-2">
                            <span>Limit depot</span>
                            <span>{format(parseISO(annonce.announce.limit_depot as string), 'EEE MMM dd yyyy')}</span>
                        </div>
                    </Badge>
                    <Card className=''>
                        <CardHeader>
                            <CardTitle className='font-light text-base'>Detail</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <Scale />
                                <span>{annonce.announce.total_weight}</span>
                                <span>{annonce.announce.total_weight_unit}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CircleDollarSign />
                                <span>{annonce.announce.price_amount}</span>
                                <span>par {annonce.announce.price_unit}</span>
                            </div>
                        </CardContent>
                    </Card>
                
                <Button type='submit' className='bg-custom-sky-50 hover:bg-custom-sky-60 w-full'>Consulter</Button>
            </CardContent>
        </Card>
    )
}
 */