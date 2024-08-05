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
import {PhoneInput} from "@/components/ui/numberphone"
import { SubmitButton } from "@/components/ui/submit-button"
// import { headers } from "next/headers";
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
import { InfoLog } from "../../../components/ui/info-log"
import useSupabase from "@/hooks/use-supabase"
import { useState } from "react"
import { CreateUser } from "@/types/user"
import { ZodError } from "zod"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function SignUp() {
    const [error, setError] = useState<{message: string | string[], status: number | undefined, isError: boolean}>({message: "", status: undefined, isError: false})
    const supabase = useSupabase();

    const signUp = async (formData: FormData) => {
    
        const origin = window.location.origin;
        // const origin = headers().get("origin");

        const userData = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            country_code: formData.get("phone-country-code") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        try {
            CreateUser.parse(userData);
        } catch (validationError) {
            if (validationError instanceof ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                validationError.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setError({message: Object.values(fieldErrors), isError: true, status: 400});
            }
            return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
                data: {
                    full_name: userData.name,
                    phone: `${userData.country_code} ${userData.phone}`
                }
            },
        });
    
        if (signUpError) {
            console.log(signUpError);
            setError({message: signUpError.message, status: signUpError.status, isError: true});
            // redirect("signup?message=Trouble pour vous inscrir reessayer plus tard.&iserror=true");
            return;
        }
        // redirect("signup?message=Verifier email pour continue&iserror=false");
        return setError({message: "Verifier email pour continue", status: 200, isError: false}); 
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
                    <CardTitle className="text-xl">Inscription</CardTitle>
                    <CardDescription>
                        mettez vos informations pour créer un compte!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Prenom Nom</Label>
                            <Input id="name" name="name" placeholder="Robinson" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telephone</Label>
                            <PhoneInput id="phone" name="phone" defaultCountry="SN" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" name="password" type="password" />
                        </div>
                        <SubmitButton formAction={signUp} pendingText="Inscription..." >
                            Inscription
                        </SubmitButton>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        J&apos;ai deja un compte ?{" "}
                        <Link href="signin" className="underline">
                            Connexion
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
                    {error.message.length != 0 && (
                        <InfoLog message={error.message} error={error.isError} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
