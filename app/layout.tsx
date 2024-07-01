
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Nav from "@/components/Nav";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import Footer from "@/components/ui/Footer";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning >
        <body  className={cn( "min-h-screen bg-custom-light-90 font-sans antialiased", fontSans.variable)}>
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
