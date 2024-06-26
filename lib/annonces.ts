import { z } from 'zod';

export const AnnonceSchema = z.object({
    description: z.string().nonempty("Description is required."),
    origin: z.object({
        country: z.string().nonempty("Origine country is required."),
        state: z.string().nonempty("Origine state is required."),
        city: z.string().nonempty("Origine city is required."),
    }),
    destination: z.object({
        country: z.string().nonempty("Destination country is required."),
        state: z.string().nonempty("Destination state is required."),
        city: z.string().nonempty("Destination city is required."),
    }),
    date: z.object({
        departure: z.string().nonempty("Departure date is required."),
        arrival: z.string().nonempty("Arrival date is required."),
        limit: z.string().nonempty("Limit date is required."),
    }),
    weight: z.object({
        total: z.string().nonempty("Total weight is required."),
        unit: z.string().nonempty("Weight unit is required."),
    }),
    pricing: z.object({
        price: z.string().nonempty("Price is required."),
        weightUnit: z.string().nonempty("Weight unit for price is required."),
        currency: z.string().nonempty("Currency is required."),
    }),
});

export type AnnoncePostData = z.infer<typeof AnnonceSchema>;

export type AnnonceGetData = {
    id: number;
    user_id: string;
    created_at: string;
    departure_date: string;
    arrival_date: string;
    total_weight: number;
    total_weight_unit: string;
    price_amount: number;
    price_currency: string;
    price_unit: string;
    description: string;
    origin_country: string;
    origin_state: string;
    origin_city: string;
    destination_country: string;
    destination_state: string;
    destination_city: string;
    limit_depot: string;
};
