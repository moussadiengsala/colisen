import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import { AnnonceGetData } from "@/lib/annonces";
import Annonce from "@/components/ui/annonce";

export default async function ProtectedPage() {
  const supabase = createClient();
    const { data, error } = await supabase.from("annonce")
        .select("*").order("created_at", { ascending: false }).limit(3).returns<AnnonceGetData[]>();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
            {!data ? 
                <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                    no annonce yet!
                </div>
            : data.map(annonce => (
                <>
                    <Annonce annonce={annonce} key={`annonce-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce1-${annonce.id}`}/>
                    <Annonce annonce={annonce} key={`annonce2-${annonce.id}`}/>
                </>
            ))}
        </div>
    </div>
  );
}

