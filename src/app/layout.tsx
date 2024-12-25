import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "SlipKart",
  description: "Your Very Own Product Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="m-auto min-w-[320px] max-w-7xl p-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
