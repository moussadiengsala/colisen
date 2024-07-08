import React from "react";
import Header from "../components/Header";
import RecentAnnonces from "@/components/RecentAnnonces";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative">
          <h2 className="text-center text-custom-dark-10 text-xl font-bold capitalize tablet:text-3xl desktop:text-4xl">Annonces</h2>
          <RecentAnnonces />
        </div>
      </section>
    </div>
  );
}
