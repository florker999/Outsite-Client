import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuBar from "@/ui/MenuBar";
import { Provider } from "@/components/ui/provider";
import React from "react";
import { getCookie } from "@/lib/services/Cookie";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const userName = await getCookie('username') as (string | undefined);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <MenuBar userName={userName} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
