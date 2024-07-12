"use client"
import { Button } from '@/components/ui/button'

export default function Error({
        error,
        reset,
    }: {
        error: Error & { digest?: string }
        reset: () => void
    }) {

    return (
        <div className="flex flex-col justify-center items-center my-10 w-full max-w-7xl p-3 text-sm desktop:justify-around relative">
            <h2 className="my-4 text-4xl tablet:text-5xl font-bold text-red-500 text-center">Une erreur s'est produite!</h2>
            <div className="text-center mb-4">
                <span>Nous nous excusons pour le désagrément. Veuillez réessayer.</span>
            </div>

            <Button className='bg-custom-dark-10 hover:bg-custom-dark-40 font-semibold' onClick={() => reset()}>
                Réessayer
            </Button>
        </div>
    )
}