import { createClient } from "@/utils/supabase/server";
import { AnnoncePostData } from "../types/annonces";

export async function createAnnonce(annonceData: AnnoncePostData, user: any) {
    "use server"

    const supabase = createClient();
    const { error } = await supabase
        .from('annonce')
        .insert({ 
            description: annonceData.description,
            user_id : user?.id as string,

            origin_country: annonceData.origin.country,
            origin_state: annonceData.origin.state,
            origin_city: annonceData.origin.city,

            destination_country: annonceData.destination.country,
            destination_state: annonceData.destination.state,
            destination_city: annonceData.destination.city,

            departure_date: annonceData.date.departure,
            arrival_date: annonceData.date.arrival,
            limit_depot: annonceData.date.limit,

            total_weight: annonceData.weight.total,
            total_weight_unit: annonceData.weight.unit,

            price_amount: annonceData.pricing.price,
            price_unit: annonceData.pricing.weightUnit
        });

    if (error) {
        console.log(error);
        throw error;
    }
}