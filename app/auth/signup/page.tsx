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

                    {error.message.length != 0 && (
                        <InfoLog message={error.message} error={error.isError} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
