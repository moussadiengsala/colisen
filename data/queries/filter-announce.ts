import { SupabaseClientType } from "@/utils/supabase/client";

export default async function getFilteredData(
    searchParams: { [key: string]: string | string[] | undefined }, 
    client: SupabaseClientType
) {

    let query = client.from("annonce").select("*");

    if (searchParams && Object.keys(searchParams).length > 0) {
        Object.entries(searchParams).forEach(([key, value]) => {
            query = applyFilter(query, key, value as string);
        });
    }

    const { data, error } = await query.order("created_at", { ascending: false }).limit(5);

    return { data: data, error: error };
}

function applyFilter(query: any, key: string, value: string) {
    const keyActions = {
        "origin-country": () => query.eq("origin_country", value),
        "origin-state": () => query.eq("origin_state", value),
        "origin-city": () => query.eq("origin_city", value),
        "destination-country": () => query.eq("destination_country", value),
        "destination-state": () => query.eq("destination_state", value),
        "destination-city": () => query.eq("destination_city", value),
        "departure-from": () => query.gte("departure_date", value),
        "departure-to": () => query.lte("departure_date", value),
        "arrival-from": () => query.gte("arrival_date", value),
        "arrival-to": () => query.lte("arrival_date", value),
        "limit-from": () => query.gte("limit_depot", value),
        "limit-to": () => query.lte("limit_depot", value),
    };

    if (key.includes("price")) {
        // Assuming the value format is like "100-200"
        const [minPrice, maxPrice] = value.split("-").map(Number);
        if (!isNaN(minPrice)) query = query.gte("price_amount", minPrice);
        if (!isNaN(maxPrice)) query = query.lte("price_amount", maxPrice);
    } else if (key in keyActions) {
        Object.entries(keyActions).forEach((action) => {
            if (action[0] === key) {
                query = action[1]();
                return query;
            }
        });
    }

    return query;
}
