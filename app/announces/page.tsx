
import Announces from "@/components/Announces";

export const metadata = {
  title: "announces",
};

export default function ProtectedPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return <Announces searchParams={searchParams} />
}
