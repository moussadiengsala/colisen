"use client"
import Link from "next/link"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { InfoLog } from "../../../components/ui/info-log"
import { SubmitButton } from "@/components/ui/submit-button"
import useSupabase from "@/hooks/use-supabase"
import { useState } from "react"
import { FacebookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { defaultUrl } from "@/app/layout"

export default function SignIn() {
    const [error, setError] = useState<{message: string, status: number | undefined}>({message: "", status: undefined})
    const supabase = useSupabase();
    let origin = defaultUrl;
    if (typeof window !== "undefined") {
        origin = window.location.origin
    }

    const signIn = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    
        if (error) {
            setError({message: error.message, status: error.status});
            return;
        }
    
        return redirect("/announces");
    };

    async function signInWithFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        })
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex items-center justify-center my-auto w-full max-w-7xl px-3 py-10 text-sm space-y-10 desktop:justify-around relative">
            <Card className="mx-auto w-full max-w-xl min-w-sm desktop:w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl">Connexion</CardTitle>
                    <CardDescription>
                        Enter vos informations pour vous connecter!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <Link href="/auth/forget-password" className="ml-auto inline-block text-sm underline">
                            J&apos;ai oublié mon mot de passe ?
                        </Link>
                        <SubmitButton formAction={signIn} pendingText="Connexion..." >
                            Connexion
                        </SubmitButton>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Je n&apos;ai pas de compte ?{" "}
                        <Link href="signup" className="underline">
                            Inscription
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 my-4">
                        <Separator />
                        <Button onClick={signInWithFacebook}  className="w-full bg-custom-dark-10 hover:bg-custom-dark-10/90 font-bold p-6 space-x-2">
                            <FacebookIcon />
                            <span>Facebook</span>
                        </Button>
                        <Button onClick={signInWithGoogle}  className="w-full bg-custom-dark-10 hover:bg-custom-dark-10/90 font-bold p-6 space-x-2">
                            <FacebookIcon />
                            <span>Google</span>
                        </Button>
                    </div>
                    {error.message != "" && (
                        <InfoLog message={error.message} error={true} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
