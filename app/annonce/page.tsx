import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import { AnnonceGetData } from "@/lib/annonces";
import Annonce from "@/components/ui/annonce";
import Filter from "@/components/ui/filter";
import { Input } from "@/components/ui/input";
import Search from "@/components/ui/search";
import getData from "@/lib/queries";
import PaginationAnnounce from "@/components/ui/announce-pagination";

export default async function ProtectedPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createClient();
  const { data, error } = await getData(searchParams)
  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative">
            
            <div className="flex flex-col w-fit justify-center items-centerl h-full gap-4 desktop:flex-row desktop:w-full">
              <div className="">
                <Search />
                <div className="hidden desktop:block">
                  <Filter />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {data?.map(annonce => (
                    <>
                      <Annonce annonce={annonce} key={`annonce-${annonce.id}`}/>
                    </>
                ))}
                <PaginationAnnounce />
              </div>
            </div>
        </div>
    </div>
  );
}

