import { DesktopNavbar } from "@/app/_components/desktop-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { MobileNavbar } from "./_components/mobile-navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Não é o Dev Médias",
  description: "",
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
          fontSans.variable
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
