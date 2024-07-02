"use client"
import Annonce, { AnnonceSkeleton } from "@/components/ui/annonce";
import Filter from "@/components/ui/filter";
import { Input } from "@/components/ui/input";
import Search from "@/components/ui/search";
import PaginationAnnounce from "@/components/ui/announce-pagination";
import useFilterAnnounce from "@/hooks/use-filter-announce";

export default function ProtectedPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const {
    data,
    isLoading,
    isError
  } = useFilterAnnounce(searchParams)

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
                {isLoading ? (
                  <div className='flex flex-col gap-8 w-full max-w-lg tablet:max-w-fit desktop:max-w-full'>
                      <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                          {Array.from({length: 3}, (_, i) => i).map( i => (
                              <AnnonceSkeleton key={`annonce-skelton-filter-${i}`} />
                          ))}
                      </div>
                  </div>
                ) : isError || !data || data.length == 0 ? (
                  <div className="w-full flex flex-col justify-center items-center desktop:flex-row gap-4">
                      <div className='w-full p-6 text-center text-custom-dark-60 capitalize text-lg'>
                          no annonce yet!
                      </div>
                  </div>
                ) : (
                  data.map(annonce => (
                        <Annonce annonce={annonce} key={`annonce-${annonce.announce.id}`}/>
                  ))
                )}
                <PaginationAnnounce />
              </div>
            </div>
        </div>
    </div>
  );
}
