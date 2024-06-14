import React from 'react'
import {CircleAlert, PlaneLanding, PlaneTakeoff, MapPin, CalendarDays, Scale, CircleDollarSign} from "lucide-react"
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

export default function Annonce() {
    return (
        <Card>
            <CardHeader className='w-[500px]'>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <span>Jhon Doe</span>

                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-4'>
                <Card className='flex items-center'>
                    <CardHeader className='pr-14'>
                        <PlaneTakeoff />
                        <CardTitle className='font-light text-base'>origin</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center items-center p-0'>
                        <div className='space-y-2'>
                            <div className='flex items-center gap-4'>
                                <MapPin />
                                <span>Dakar, Senegal</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <CalendarDays />
                                <span>Dim, 23, 2024</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className='flex items-center'>
                    <CardHeader>
                        <PlaneLanding />
                        <CardTitle className='font-light text-base'>destination</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center items-center p-0'>
                        <div className='space-y-2'>
                            <div className='flex items-center gap-4'>
                                <MapPin />
                                <span>Ottawa, Canada</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <CalendarDays />
                                <span>Dim, 23, 2024</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Badge variant="outline" className='bg-red-500/40 p-4 flex gap-2 rounded-md'>
                    <CircleAlert />
                    <div className="flex justify-center gap-2">
                        <span>Limit depot</span>
                        <span>dim, 12 2024</span>
                    </div>
                </Badge>
                <Card className=''>
                    <CardHeader>
                        <CardTitle className='font-light text-base'>Detail</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <div className='flex items-center gap-2'>
                            <CircleDollarSign />
                            <span>15.000</span>
                            <span>CFA par KG</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Scale />
                            <span>15</span>
                            <span>KG restante pour cette colis</span>
                        </div>
                    </CardContent>
                </Card>
                <Button type='submit' className='bg-custom-sky-50 hover:bg-custom-sky-60 w-full'>Consulter</Button>
            </CardContent>
        </Card>
    )
}
