"use client"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import React, { useState } from 'react'
// import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { InfoLog } from '../../../components/ui/info-log';
import useSupabase from '@/hooks/use-supabase';
// import { headers } from 'next/headers';

export default function ForgetPassword() {
    const [error, setError] = useState<{message: string, status: number | undefined, isError: boolean}>({message: "", status: undefined, isError: false})
    const supabase = useSupabase();
    
    const resetPassword = async (formData: FormData) => {
        const origin =  window.location.origin;
        const email = formData.get("email") as string;
        
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/auth/update-password`,
        })

        if (resetError) {
            // redirect("forget-password?message=Trouble pour reinitialiser le mot de passe&iserror=true");
            setError({message: resetError.message, status: resetError.status, isError: true});
            return;
        }

        // redirect("forget-password?message=Verifier votre email pour reinitialiser le mot de passe&iserror=false");
        setError({message: "Verifier votre email pour reinitialiser le mot de passe", status: 200, isError: false});
        return;
    };

    return (
        <div className="flex items-center justify-center my-auto w-full max-w-7xl px-3 py-10 text-sm space-y-10 desktop:justify-around relative">
            <Card className="mx-auto w-full max-w-xl min-w-sm desktop:w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl">Mot de passe oublié !</CardTitle>
                    <CardDescription>
                        Enter votre email pour reinitialiser ton mot de passe.
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
                        <SubmitButton formAction={resetPassword} className="w-full" pendingText="Reinitialisation..." >
                            Reinitialiser
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
