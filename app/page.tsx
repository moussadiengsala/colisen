import React from "react";
import Header from "../components/Header";
import RecentAnnonces from "@/components/RecentAnnonces";
import CardAvantage from "@/components/ui/card-avantage";
import { CircleAlertIcon, CircleCheckIcon, MailIcon, MapPinIcon, PhoneIcon, ShieldIcon, UsersRoundIcon } from "lucide-react";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Header />
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 pb-14 text-sm space-y-10 desktop:justify-around relative border-b-2 border-b-custom-dark-60/20">
          <h2 className="text-center text-blue-900 text-xl font-bold capitalize tablet:text-3xl desktop:text-4xl">Annonces</h2>
          <RecentAnnonces />
        </div>
      </section>
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 pb-14 text-sm space-y-10 desktop:justify-around relative border-b-2 border-b-custom-dark-60/20">
          <h2 className="text-center text-blue-900 text-xl font-bold capitalize tablet:text-3xl desktop:text-4xl">Nos Avantages</h2>
          <div className="flex flex-col desktop:flex-row gap-2">
            <CardAvantage title="Reseau de Gps Fiables" icon={CircleCheckIcon}>
              Nous travaillons avec des partenaires de confiance pour assurer la sécurité de vos envois. Nos GPS sont vérifiés pour garantir une expérience sans souci.
            </CardAvantage>
            <CardAvantage title="Facile a utiliser" icon={UsersRoundIcon}>
              Notre plateforme intuitive vous permet de publier des annonces ou de trouver des GPS rapidement et facilement. Pas de complications, juste des connexions efficaces.
            </CardAvantage>
            <CardAvantage title="Connexions securisées" icon={ShieldIcon}>
              Votre sécurité est notre priorité. Nous mettons tout en œuvre pour que chaque connexion soit sûre et fiable.
            </CardAvantage>
          </div>
        </div>
      </section>
      <section className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center w-full max-w-7xl p-3 text-sm space-y-10 desktop:justify-around relative">
          <h2 className="text-center text-blue-900 text-xl font-bold capitalize tablet:text-3xl desktop:text-4xl">Contactez-Nous</h2>
          <div className="flex flex-col desktop:flex-row gap-2">
              <CardAvantage title="Addresse Email" icon={MailIcon}>
                <div className="flex flex-col gap-2 w-full">
                  <span>contact@example.com</span>
                  <span>support@example.com</span>
                </div>
              </CardAvantage>
              <CardAvantage title="Appelez-Nous" icon={PhoneIcon}>
                <div className="flex flex-col gap-2 w-full">
                  <span>+221 78 000 00 00</span>
                  <span>+221 33 000 00 00</span>
                </div>
              </CardAvantage>
              <CardAvantage title="Sénégal - HQ" icon={MapPinIcon}>
                Sénégal, Dakar, Pikine Departement
              </CardAvantage>
            </div>
          </div>
      </section>
    </div>
  );
}
