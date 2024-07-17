import { CircleAlertIcon, LucideProps } from 'lucide-react'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"

type CardAvantageProps = {
    title: string,
    children: React.ReactNode,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export default function CardAvantage({ title, children, icon: Icon} : CardAvantageProps) {
    return (
        <Card className='bg-custom-light-98 rounded-md p-4 w-full max-w-lg desktop:max-w-full desktop:w-full desktop:flex-row desktop:p-8'>
            <CardHeader className='w-full flex flex-col items-center gap-2'>
                <Icon className='text-blue-900'/>
                <CardTitle className='font-light text-base text-blue-900'>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex w-full text-center'>
                {children}
            </CardContent>
        </Card>
    )
}
