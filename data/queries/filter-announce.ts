import { SupabaseClientType } from "@/utils/supabase/client";

export default async function getFilteredData(
    searchParams: { [key: string]: string | string[] | undefined }, 
    client: SupabaseClientType,
    limit: number
) {

    let query = client.from("annonce").select("*", { count: 'exact' });

    if (searchParams && Object.keys(searchParams).length > 0) {
        Object.entries(searchParams).forEach(([key, value]) => {
            query = applyFilter(query, key, value as string);
        });
    }

    const page = parseInt(searchParams.page as string || '1', 10);
    const offset = (page - 1) * limit;

    const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

    return { data: data, error: error, total: count || 0 };
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
        "q": () => {
            const conditions = [
                `origin_country.ilike.%${value}%`,
                `origin_state.ilike.%${value}%`,
                `origin_city.ilike.%${value}%`,
                `destination_country.ilike.%${value}%`,
                `destination_state.ilike.%${value}%`,
                `destination_city.ilike.%${value}%`,
                `departure_date.ilike.%${value}%`,
                `arrival_date.ilike.%${value}%`,
                `limit_depot.ilike.%${value}%`
            ]
            return query.or(conditions.join(","))
        },
        "origin": () => {
            const conditions = [
                `origin_country.ilike.%${value}%`,
                `origin_state.ilike.%${value}%`,
                `origin_city.ilike.%${value}%`
            ]
            return query.or(conditions.join(","))
        },
        "destination": () => {
            const conditions = [
                `destination_country.ilike.%${value}%`,
                `destination_state.ilike.%${value}%`,
                `destination_city.ilike.%${value}%`
            ]
            return query.or(conditions.join(","))
        }
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