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

export default function SignIn({
    searchParams
}: {
    searchParams: { message: string, iserror: boolean };
}) {
    const signIn = async (formData: FormData) => {
        "use server";
    
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();
    
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    
        if (error) {
            return redirect("signin?message=Could not authenticate user&iserror=true");
        }
    
        return redirect("/protected");
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
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/auth/forget-password" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                        </div>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    <SubmitButton formAction={signIn} className="w-full" pendingText="Connexion..." >
                        Connexion
                    </SubmitButton>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="signup" className="underline">
                        Inscription
                    </Link>
                </div>
                {searchParams?.message && (
                    <InfoLog message={searchParams.message} error={searchParams.iserror} />
                )}
            </CardContent>
        </Card>
    )
}
