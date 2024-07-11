import { AnnonceSchema, AnnoncePostData } from '@/types/annonces';
import { z } from 'zod';

export function validateAnnonceData(entries: { [key: string]: string }) : {
    isValid: boolean,
    errors: { [key: string]: string } | null,
    data: AnnoncePostData | null
} {
    const annonceData: AnnoncePostData = {
        description: entries["description"],
        origin: {
            country: entries["origine-country"],
            state: entries["origine-state"],
            city: entries["origine-city"],
        },
        destination: {
            country: entries["destination-country"],
            state: entries["destination-state"],
            city: entries["destination-city"],
        },
        date: {
            departure: entries["departure-date"],
            arrival: entries["arrival-date"],
            limit: entries["limit-date"],
        },
        weight: {
            total: entries["total-weight"],
            unit: entries["weight-unit"] as "g" | "kg",
        },
        pricing: {
            price: entries["price-weight"],
            weightUnit: entries["weight-unit-price"] as "g" | "kg",
        },
    };

    try {
        AnnonceSchema.parse(annonceData);
        return { isValid: true, errors: null, data: annonceData };
    } catch (e) {
        if (e instanceof z.ZodError) {
            const errors: { [key: string]: string } = {};
            e.errors.forEach((error) => {
                const key = error.path.join('.');
                errors[key] = error.message;
            });
            return { isValid: false, errors, data: null };
        }
    }

    return { isValid: false, errors: { general: 'An unexpected error occurred' }, data: null };
}
