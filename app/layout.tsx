import type { Metadata } from "next";
import { inter, cinzel } from "@/app/fonts";
import "./globals.css";
import { BottomBar } from "@/components/game/BottomBar";

export const metadata: Metadata = {
  title: "AHLCG Round Tracker",
  description: "Arkham Horror LCG Round Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}>
        <div className="pb-16 sm:pb-20">
          {children}
        </div>
        <BottomBar />
      </body>
    </html>
  );
}
