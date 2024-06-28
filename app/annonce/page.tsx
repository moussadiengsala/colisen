import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import { AnnonceGetData } from "@/lib/annonces";
import Annonce from "@/components/ui/annonce";
import Filter from "@/components/ui/filter";

export default async function ProtectedPage() {
  const supabase = createClient();
    const { data, error } = await supabase.from("annonce")
        .select("*").order("created_at", { ascending: false }).limit(3).returns<AnnonceGetData[]>();

  return (
    <div className="flex-1 w-full flex justify-center items-center bg-red-500">
      <div className="flex items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative bg-green-500">
            <Filter />
            <div>
              {data?.map(annonce => (
                  <>
                    <Annonce annonce={annonce} key={`annonce-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce1-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce2-${annonce.id}`}/>
                  </>
              ))}
            </div>
        </div>
    </div>
  );
}

