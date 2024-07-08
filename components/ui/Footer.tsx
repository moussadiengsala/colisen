import React from 'react'
import Socialmedia from './socialmedia'

export default function Footer() {
    return (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center items-center text-center text-xs">
            <div className='w-full max-w-7xl p-3 text-sm'>
                <div className='flex flex-col-reverse gap-4 tablet:gap-0 tablet:flex-row justify-between items-center w-full'>
                    <p>2024 <strong>Colisen</strong>. Tous droits réservés.</p>
                    <Socialmedia isLabelNeeded={false} />
                </div>
            </div>
        </footer>
    )
}
