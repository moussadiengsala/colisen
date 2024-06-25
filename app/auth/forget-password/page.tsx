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
            return redirect("forget-password?message=Could not send reset password email&iserror=true");
        }

        return redirect("forget-password?message=Check your email for the reset link&iserror=false");
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                Enter your email below to login to your account
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
    )
}
