import { Database } from "./supabase"

export type User = {
    profile: Database["public"]["Tables"]["profiles"]["Row"],
    email: string | undefined
}
