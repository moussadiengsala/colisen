
import "./globals.css";
import Nav from "@/components/Nav";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import Footer from "@/components/ui/Footer";

export const metadata = {
    metadataBase: new URL("https://colisen.store"),
    title: "colisen",
    applicationName: "colisen",
    description: "Colisen est une plateforme web qui connecte les GP avec les personnes qui ont besoin de transporter des marchandises à l'international.",
    keywords: ["transport", "international", "GP", "expédition", "logistique", "suivi", "colis", "paiement", "sécurisé", "gestion", "colisen"],
    authors: [{name: "Moussa Dieng", url: "https://www.moussa-dieng.dev"}],
    creator: "Moussa Dieng",
    publisher: "Moussa Dieng",
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: "https://colisen.store",
      site_name: 'Colisen',
      title: "Colisen - Plateforme de Transport International",
      description: "Colisen est une plateforme web qui connecte les GP avec les personnes qui ont besoin de transporter des marchandises à l'international.",
      images: [
        {
          url: `https://colisen.store/images/logo.png`,
          width: 800,
          height: 600,
          alt: 'colisen',
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   site: '@colisen',
    //   title: "Colisen - Plateforme de Transport International",
    //   description: "Colisen est une plateforme web qui connecte les GP avec les personnes qui ont besoin de transporter des marchandises à l'international.",
    //   image: `${defaultUrl}/images/twitter-image.jpg`,
    // },
    alternates: {
      canonical: "https://www.colisen.store"
    },
};


export default function RootLayout({ children }: {  children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="fr" suppressHydrationWarning>
        <body  className={`min-h-screen antialiased`}>
          <Nav />
          <main className="flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
