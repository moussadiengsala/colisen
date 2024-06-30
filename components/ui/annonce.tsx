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
import { AnnonceGetData } from '@/lib/annonces'
import DynamicAvatarProfile from './DynamicAvatarProfile'
import { createClient } from '@/utils/supabase/server'
import { UserGetData } from '@/lib/user'
import { format, parseISO } from 'date-fns'

export default async function Annonce({annonce} : {annonce: AnnonceGetData}) {
    const supabase = createClient()

    const { data, error } = await supabase.from("profiles")
        .select("*").eq("id", annonce.user_id).returns<UserGetData[]>()
    if (error) {
        return
    }
    const user = data[0]

    return (
        <Card className='bg-custom-light-98 rounded-md w-full max-w-lg tablet:max-w-fit desktop:max-w-full desktop:flex-1'>
            <CardHeader className=''>
                <div className='w-full flex items-center justify-between'>
                    <div  className='flex items-center gap-2'>
                        <Avatar>
                            <DynamicAvatarProfile userid={user.id} /> 
                        </Avatar>
                        <div className='flex flex-col'>
                            <span>{user.first_name}</span>
                            <span>{user.last_name}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PhoneCallIcon className='w-5 h-5'/>
                        <span>+{user.telephone}</span>
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
                                            <p>{annonce.destination_country} {annonce.destination_state} {annonce.destination_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.departure_date), 'EEE MMM dd yyyy')}</span>
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
                                            <p>{annonce.destination_country} {annonce.destination_state} {annonce.destination_city}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <CalendarDays />
                                        <span>{format(parseISO(annonce.departure_date), 'EEE MMM dd yyyy')}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Badge variant="outline" className='p-4 flex gap-2 rounded-md'>
                        <CircleAlert />
                        <div className="flex justify-center gap-2">
                            <span>Limit depot</span>
                            <span>{format(parseISO(annonce.limit_depot), 'EEE MMM dd yyyy')}</span>
                        </div>
                    </Badge>
                    <Card className=''>
                        <CardHeader>
                            <CardTitle className='font-light text-base'>Detail</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <Scale />
                                <span>{annonce.total_weight}</span>
                                <span>{annonce.total_weight_unit}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CircleDollarSign />
                                <span>{annonce.price_amount}</span>
                                <span>par {annonce.price_unit}</span>
                            </div>
                        </CardContent>
                    </Card>
                
                <Button type='submit' className='bg-custom-sky-50 hover:bg-custom-sky-60 w-full'>Consulter</Button>
            </CardContent>
        </Card>
    )
}
