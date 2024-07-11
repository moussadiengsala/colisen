import { AlertCircle, CheckCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function InfoLog({ message, error }: {message: string | string[], error: boolean}) {

    return error ? (
        <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
                {Array.isArray(message) ? (
                    message.map((m, i) => (<span key={i}>{m}</span>))
                ):(
                    <span>{message}</span>
                )}
            </AlertDescription>
        </Alert>
    ) : (
        <Alert className="my-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Succes</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
                {Array.isArray(message) ? (
                    message.map((m, i) => (<span key={i}>{m}</span>))
                ):(
                    <span>{message}</span>
                )}
            </AlertDescription>
        </Alert>
    )
}
