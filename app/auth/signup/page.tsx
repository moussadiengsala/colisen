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
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { InfoLog } from "../info-log"
import UploadAvatar from "@/components/updateProfile"

export default function SignUp({
        searchParams,
    }: {
        searchParams: { message: string, iserror: boolean };
    }) {

    const signUp = async (formData: FormData) => {
        "use server";
    
        const origin = headers().get("origin");
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const telephone = formData.get("telephone") as string;
        const countryCode = formData.get("telephone-country-code") as string;
        const fullTelephone = `${countryCode} ${telephone}`
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();
        
        console.log("Form Data:", { firstName, lastName, fullTelephone, email, password })
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    telephone: fullTelephone
                }
            },
        });
    
        if (error) {
            return redirect("signup?message=Could not authenticate user&iserror=true");
        }
    
        return redirect("signup?message=Check email to continue sign in process&iserror=false");
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Inscription</CardTitle>
                <CardDescription>
                mettez vos informations pour creer un compte!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    <div className="grid grid-rows-2 gap-4 tablet:grid-cols-2 tablet:grid-rows-1">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Prenom</Label>
                            <Input id="first-name" name="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Nom de famille</Label>
                            <Input id="last-name" name="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="telephone">Telephone</Label>
                        <PhoneInput id="telephone" name="telephone" defaultCountry="SN" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de pass</Label>
                        <Input id="password" name="password" type="password" />
                    </div>
                    <SubmitButton formAction={signUp} className="w-full" pendingText="Inscription..." >
                        Inscription
                    </SubmitButton>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="signin" className="underline">
                        Connexion
                    </Link>
                </div>
                {searchParams?.message && (
                    <InfoLog message={searchParams.message} error={searchParams.iserror} />
                )}
            </CardContent>
        </Card>
    )
}
