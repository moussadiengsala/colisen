
import "./globals.css";
import Nav from "@/components/Nav";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import Footer from "@/components/ui/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Colisen - Plateforme de Transport International",
    description: "Colisen est une plateforme web qui connecte les GP avec les personnes qui ont besoin de transporter des marchandises à l'international.",
    keywords: "transport international, GP, expédition, logistique, suivi colis, paiement sécurisé",
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: defaultUrl,
      site_name: 'Colisen',
      title: "Colisen - Plateforme de Transport International",
      description: "Colisen est une plateforme web qui connecte les GP avec les personnes qui ont besoin de transporter des marchandises à l'international.",
      images: [
        {
          url: `${defaultUrl}/images/logo.png`,
          width: 800,
          height: 600,
          alt: 'Colisen',
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
      canonical: defaultUrl
    }
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
