import React from "react";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "../utils/supabase/server";
import ConnectSupabaseSteps from "../components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "../components/tutorial/SignUpUserSteps";
import Header from "../components/Header";
import Nav from "@/components/Nav";
import Annonce from "@/components/ui/annonce";
import { Separator } from "@/components/ui/separator";
import RecentAnnonces from "@/components/RecentAnnonces";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative'">
          <h2 className="text-center text-custom-dark-10 text-xl font-bold capitalize tablet:text-3xl desktop:text-5xl">Annonces en vedettes</h2>
          <RecentAnnonces />
        </div>
      </section>
    </div>
  );
}
