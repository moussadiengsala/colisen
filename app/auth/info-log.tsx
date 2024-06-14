
import { type ComponentProps } from "react";
import { AlertCircle, CheckCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function InfoLog({ message, error }: {message: string, error: boolean}) {

    return error ? (
        <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    ) : (
        <Alert className="my-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Succes</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
