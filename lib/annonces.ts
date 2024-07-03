import { z } from 'zod';
import { validateLocation } from './validate-location';
import { isBefore, isAfter, parseISO, startOfDay } from 'date-fns';
import { validateDate } from './validate-date';
import { Database } from '@/types/supabase';

export const AnnonceSchema = z.object({
    description: z.string().max(255, "Description must be 255 characters or less.").optional(),
    origin: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string(),
    }).superRefine( (value, ctx) => {
        validateLocation(value, ctx)
    }),

    destination: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string(),
    }).superRefine( (value, ctx) => {
        validateLocation(value, ctx)
    }),

    date: z.object({
        departure: z.string(),
        arrival: z.string(),
        limit: z.string(),
    }).superRefine( (value, ctx) => {
        validateDate(value, ctx);
    }),

    weight: z.object({
        total: z.string().nonempty("Total weight is required."),
        unit: z.enum(["g", "kg"], { message: "Weight unit must be 'g' or 'kg'." }),
    }),

    pricing: z.object({
        price: z.string().nonempty("Price is required."),
        weightUnit: z.enum(["g", "kg"], { message: "Weight unit must be 'g' or 'kg'." }),
    }),
}).superRefine((data, ctx) => {
    if ( data.origin.country &&
        (data.origin.country === data.destination.country ||
        data.origin.state === data.destination.state ||
        data.origin.city === data.destination.city)
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Origine et destination doivent etre differents.",
            path: ["destination"],
        });
    }
});

export type AnnoncePostData = z.infer<typeof AnnonceSchema>;

export type AnnonceGetData = {
    profile: Database["public"]["Tables"]["profiles"]["Row"],
    announce: Database["public"]["Tables"]["annonce"]["Row"],
}
