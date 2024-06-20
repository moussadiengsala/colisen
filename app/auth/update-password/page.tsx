import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import { InfoLog } from "../info-log"
import { SubmitButton } from "@/components/ui/submit-button"

export default function UpdatePassword({
    searchParams
}: {
    searchParams: { message: string, iserror: boolean, code: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const new_password = formData.get("password1") as string;
        const password = formData.get("password2") as string;
        const supabase = createClient();
    
        if (new_password != password) {
            return redirect("update-password?message=mismatch password&iserror=true");
        }

        if (searchParams.code) {
            await supabase.auth.exchangeCodeForSession(searchParams.code);
            const { data, error } = await supabase.auth.updateUser({
                password: new_password,
                
            })
        
            if (error) {
                return redirect("update-password?message=Could not sav the new password&iserror=true");
            }
        }  else {
            return redirect("update-password?message=No recovery code provided&iserror=true");
        }
        
        return redirect("/protected");
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                creer un nouveau password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password1">New Password</Label>
                        <Input
                            id="password1"
                            type="password"
                            name="password1"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password2">Confirm new password</Label>
                        <Input
                            id="password2"
                            type="password"
                            name="password2"
                            required
                        />
                    </div>
                    <SubmitButton formAction={signIn} className="w-full" pendingText="Enregistrement..." >
                        Enregistrer
                    </SubmitButton>
                </form>
                {searchParams?.message && (
                    <InfoLog message={searchParams.message} error={searchParams.iserror} />
                )}
            </CardContent>
        </Card>
    )
}


// http://localhost:3000/auth/update-password?error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired