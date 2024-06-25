// "use client"

import React, { Fragment } from 'react'
import { Popover, Transition } from "@headlessui/react"
import { navigation } from '@/data'
import Link from 'next/link'
import Socialmedia from './socialmedia'
import { Button } from './button'
import AuthButton from '../AuthButton'
import MobileNavigationClient, { MobileNavLink } from './mobilenavicon'



export default function MobileNavigation({navigations} : {navigations: navigation[]}) {
    return (
        <MobileNavigationClient navigations={navigations}>
            {navigations.map(nav => (
                    <MobileNavLink href={nav.href} key={`${nav.label}mobile`}>
                        {nav.label}
                    </MobileNavLink> 
                )
            )}

            <AuthButton isMobile={true} />
                    
            <hr className="border-1 w-full border-custom-light-90" />
            <div className="">
                <Socialmedia isLabelNeeded={false} />
            </div>
        </MobileNavigationClient>
    )
}
