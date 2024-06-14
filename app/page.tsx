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
      <Nav />
      <Header />
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative'">
          <h2 className="text-custom-dark-10 font-bold text-4xl">Annonces envedettes</h2>
          <div className="flex justify-center items-center gpa-4">
            <Annonce />
            <Annonce />
            <Annonce />
          </div>
        </div>
      </section>
    </div>
  );
}
