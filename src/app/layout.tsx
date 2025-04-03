import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "oi.DECS - Control System",
  description:
    "Control system for managing low-temperature and cryomagnetic systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1 px-2 sm:px-6 py-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
