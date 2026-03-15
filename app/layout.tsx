import type { Metadata } from "next";
import Script from "next/script";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "aos/dist/aos.css";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import AOSInit from "@/src/components/AOSInit";
import { routes } from "@/src/lib/routes";

export const metadata: Metadata = {
  title: "Dive Evolution",
  description:
    "Its a site for tourism and diving, that improves in the implement of the PSS learning style in the San Cristobal in Galapagos Island in Ecuador."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="keywords" content="San Cristobal, Diving, Ecuador, Galapagos, Santa Cruz, Isabela" />
      </head>
      <body>
        <AOSInit />
        <Navbar routes={routes} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer routes={routes} />
        <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
