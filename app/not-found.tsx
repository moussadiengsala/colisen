"use client"

import { useEffect } from "react"

export default function notFound() {

    return (
        <div className="flex flex-col justify-center items-center my-10 w-full max-w-7xl p-3 text-sm desktop:justify-around relative">
            <h2 className="my-4 text-4xl tablet:text-5xl font-bold text-orange-500">404</h2>
            <div className="text-center">
                <span>Nous sommes désolés, mais la page que vous recherchez n'existe pas</span>
            </div>
        </div>
    )
}