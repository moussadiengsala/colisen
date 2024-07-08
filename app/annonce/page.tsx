"use client"
import Annonce, { AnnonceSkeleton } from "@/components/ui/annonce";
import Filter from "@/components/ui/filter";
import { Input } from "@/components/ui/input";
import Search from "@/components/ui/search";
import PaginationAnnounce from "@/components/ui/announce-pagination";
import useFilterAnnounce from "@/hooks/use-filter-announce";
import { useEffect } from "react";

export default function ProtectedPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const limit = 2
  const {
    data,
    isLoading,  
    isError
  } = useFilterAnnounce(searchParams, limit)

  return (
    <div className="flex-1 w-full flex justify-center items-center py-4">
      <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative">
            
            <div className="flex flex-col w-fit justify-center items-centerl h-full gap-4 tablet:w-3/4 desktop:flex-row desktop:w-full">
              <div className="">
                <Search />
                <div className="hidden desktop:block">
                  <Filter />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                
                {isLoading ? (
                  <>
                    {Array.from({length: 3}, (_, i) => i).map( i => (
                        <AnnonceSkeleton key={`annonce-skelton-filter-${i}`} />
                    ))} 
                  </>
                ) : isError || !data || !data.announces || data.announces.length === 0 ? (
                  <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                      <div className='w-full p-6 text-center text-custom-dark-60 text-lg'>
                          auccune annonce trovée!
                      </div>
                  </div>
                ) : (
                  <>
                    {data.announces.map(annonce => (
                        <Annonce annonce={annonce} key={`annonce-${annonce.announce.id}`}/>
                    ))}
                    <PaginationAnnounce total={data?.total} limit={limit} />
                  </>
                )}
              </div>
            </div>
        </div>
    </div>
  );
}
