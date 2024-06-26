import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import React from 'react'
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { InfoLog } from '../../../components/ui/info-log';
import { headers } from 'next/headers';

export default function ForgetPassword({
    searchParams
}: {
    searchParams: { message: string, iserror: boolean };
}) {
    const resetPassword = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const supabase = createClient();
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/auth/update-password`,
        })

        if (error) {
            return redirect("forget-password?message=Trouble pour reinitialiser le mot de passe&iserror=true");
        }

        return redirect("forget-password?message=Verifier votre email pour reinitialiser le mot de passe&iserror=false");
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
                    {searchParams?.message && (
                        <InfoLog message={searchParams.message} error={searchParams.iserror} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
