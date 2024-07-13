"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { InfoLog } from "../../../components/ui/info-log"
import { SubmitButton } from "@/components/ui/submit-button"
import { useEffect, useState } from "react"
import useSupabase from "@/hooks/use-supabase"

export default function UpdatePassword({ searchParams } : { searchParams: { code: string } }) {
    const [error, setError] = useState<{message: string, status: number | undefined, isError: boolean}>({message: "", status: undefined, isError: false})
    const supabase = useSupabase();

    const updatePassword = async (formData: FormData) => {

        const new_password = formData.get("password1") as string;
        const password = formData.get("password2") as string;

        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0;
    
        for (let i = 0; i < new_password.length; i++) {
            let ch = new_password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
        }
    
        if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1 ) {    
            setError({message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.", status: 400, isError: true});
            return;
        }

    
        if (new_password != password) {
            setError({message: "mismatch password", status: 400, isError: true});
            return;
        }

        await supabase.auth.exchangeCodeForSession(searchParams.code);
        const { data, error } = await supabase.auth.updateUser({
            password: new_password,
            
        })
        
        if (error) {
            setError({message: "Trouble pour engregistrer le nouveau mot de passe", status: 400, isError: true});
            return;
        }
        
        return redirect("/announces");
    };

    useEffect(() => {
        if (!searchParams?.code) {
            return redirect(`forget-password`);
        }
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center my-auto w-full max-w-7xl px-3 py-10 text-sm space-y-10 desktop:justify-around relative">
            <Card className="mx-auto w-full max-w-xl min-w-sm desktop:w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl">Mettre a jour le mot de passe</CardTitle>
                    <CardDescription>
                        creer un nouveau mot de passe.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password1">Nouveau mot de paase</Label>
                            <Input
                                id="password1"
                                type="password"
                                name="password1"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password2">Confirme le nouveau mot de paase</Label>
                            <Input
                                id="password2"
                                type="password"
                                name="password2"
                                required
                            />
                        </div>
                        <SubmitButton formAction={updatePassword} pendingText="Enregistrement..." >
                            Enregistrer
                        </SubmitButton>
                    </form>
                    {error.message.length != 0 && (
                        <InfoLog message={error.message} error={error.isError} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}


// http://localhost:3000/auth/update-password?
/**
    error=access_denied&
    error_code=403
    error_description=Email+link+is+invalid+or+has+expired#error=access_denied&
    error_code=403
    error_description=Email+link+is+invalid+or+has+expired
 */

// https://www.google.com/url?q=https://txsoosgksspghvtmgjuv.supabase.co/auth/v1/verify?token%3Dpkce_10e44f9d3631507a4cda77dc7125076d45de54e30b721c88c4c13eef%26type%3Drecovery%26redirect_to%3Dhttp://localhost:3000/auth/update-password&source=gmail&ust=1720900697445000&usg=AOvVaw0-MrUsVbTrXBLJ31zjbTvU