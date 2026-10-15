import { DesktopNavbar } from "@/app/_components/desktop-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileNavbar } from "./_components/mobile-navbar";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Grades are read in columns, so every numeral renders in a mono face.
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Não é o Dev Médias",
  description:
    "Calcule suas médias da Mauá sem encheção de saco. Escolha suas matérias, lance as notas e veja onde você está.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          // The mobile navbar is fixed to the bottom, so content needs room
          // to scroll clear of it.
          "pb-20 md:pb-0",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider>
          <DesktopNavbar />
          <MobileNavbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
