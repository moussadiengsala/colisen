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




export default function SignIn() {
    const [error, setError] = useState<{message: string, status: number | undefined}>({message: "", status: undefined})
    const supabase = useSupabase();

    const defaultUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
    let origin = typeof window !== "undefined" ? window.location.origin : defaultUrl;

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
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="w-7">
                                <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                            </svg>
                            <span>Facebook</span>
                        </Button>
                        <Button onClick={signInWithGoogle}  className="w-full bg-custom-dark-10 hover:bg-custom-dark-10/90 font-bold p-6 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="w-7">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
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
