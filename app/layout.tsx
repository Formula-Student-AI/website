import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/ui/fonts";
import Header from "./ui/layout/Header";
import "./globals.css";

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
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
