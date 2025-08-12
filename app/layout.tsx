import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/ui/fonts";
import Header from "./ui/layout/Header";
import "./globals.css";
import Footer from "./ui/layout/Footer";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Bristol Formula Student AI",
  description: "Bristol Formula Student AI team's official website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <NextTopLoader color="#AB1F2D" showSpinner={false} height={2} />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
