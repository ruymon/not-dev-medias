import { DesktopNavbar } from "@/app/_components/desktop-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileTabBar } from "./_components/mobile-tab-bar";
import { ServiceWorker } from "./_components/service-worker";

export const metadata: Metadata = {
  title: "Não é o Dev Médias",
  description:
    "Calcule suas médias da Mauá sem encheção de saco. Escolha suas matérias, lance as notas e veja onde você está.",
  applicationName: "Dev Médias",
  appleWebApp: {
    capable: true,
    title: "Dev Médias",
    // Lets the page draw under the status bar; the layout pads for it.
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  // Without `cover`, iOS reports every safe-area inset as 0 and a home-screen
  // install puts the tab bar under the home indicator.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={
          // Room for the status bar on top and the tab bar plus home
          // indicator below. Both insets are 0 outside a home-screen install.
          "flex min-h-dvh flex-col bg-background pt-safe font-sans antialiased pb-[calc(var(--spacing-tab-bar)+env(safe-area-inset-bottom))] md:pb-0"
        }
      >
        <ThemeProvider>
          {/* Content scrolls under the translucent status bar, so it gets the
              same material as the tab bar instead of text running under the
              clock. */}
          <div
            aria-hidden
            className="fixed inset-x-0 top-0 z-20 h-safe-top bg-background/80 backdrop-blur-xl md:hidden"
          />
          <DesktopNavbar />
          {children}
          <MobileTabBar />
          <Toaster />
          <ServiceWorker />
        </ThemeProvider>
      </body>
    </html>
  );
}
