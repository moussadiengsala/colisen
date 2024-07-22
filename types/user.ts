import { z } from "zod";
import { Database } from "./supabase"

export const CreateUser = z.object({
    name: z.string()
        .min(1, { message: "Le nom est requis." })
        .max(18, { message: "Le nom doit comporter au maximum 18 caractères." }),
    phone: z.string()
        .min(10, { message: "Le numéro de téléphone doit comporter au moins 10 chiffres." })
        .max(15, { message: "Le numéro de téléphone doit comporter au maximum 15 chiffres." }),
    country_code: z.string()
        .min(1, { message: "Le code pays est requis." })
        .max(4, { message: "Le code pays doit comporter au maximum 4 caractères." }), // Adjust the max length based on the country code format
    email: z.string()
        .email({ message: "L'email doit être valide." }),
    password: z.string()
        .min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
}).superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);

    let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0;

    for (let i = 0; i < password.length; i++) {
        let ch = password.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
    }

    if (
        countOfLowerCase < 1 ||
        countOfUpperCase < 1 ||
        countOfNumbers < 1
    ) {
        checkPassComplexity.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.",
            path: ["password"],
        });
    }
});



export type User = {
    profile: Database["public"]["Tables"]["profiles"]["Row"],
    email: string | undefined
}
