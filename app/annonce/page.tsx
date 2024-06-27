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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
            <Filter />
            <div>
              {!data ? 
                  <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                      no annonce yet!
                  </div>
              : 
                  <>
                    liste here 
                  </>}
            </div>
        </div>
    </div>
  );
}

