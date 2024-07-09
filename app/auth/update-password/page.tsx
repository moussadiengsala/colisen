
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

import { InfoLog } from "../../../components/ui/info-log"
import { SubmitButton } from "@/components/ui/submit-button"

export default function UpdatePassword({
    searchParams
}: {
    searchParams: { message: string, iserror: boolean, code: string, error_description: string };
}) {

    if (searchParams?.error_description) {
        return redirect(`update-password?message=Le lien de l'email est invalide ou expiré&iserror=true`);
    }

    if (!searchParams?.code) {
        return redirect(`forget-password`);
    }

    const updatePassword = async (formData: FormData) => {
        "use server";

        const new_password = formData.get("password1") as string;
        const password = formData.get("password2") as string;
        const supabase = createClient();
    
        if (new_password != password) {
            return redirect("update-password?message=mismatch password&iserror=true");
        }

        await supabase.auth.exchangeCodeForSession(searchParams.code);
        const { data, error } = await supabase.auth.updateUser({
            password: new_password,
            
        })
        
        if (error) {
            return redirect("update-password?message=Trouble pour engregistrer le nouveau mot de passe&iserror=true");
        }
        
        return redirect("/annonce");
    };

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
                        <SubmitButton formAction={updatePassword} className="w-full" pendingText="Enregistrement..." >
                            Enregistrer
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


// http://localhost:3000/auth/update-password?
/**
    error=access_denied&
    error_code=403
    error_description=Email+link+is+invalid+or+has+expired#error=access_denied&
    error_code=403
    error_description=Email+link+is+invalid+or+has+expired
 */