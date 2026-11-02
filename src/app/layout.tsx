import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./_components/navbar";
import "./globals.css";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: {
		default: "Não é o Dev Médias",
		template: "%s · Não é o Dev Médias",
	},
	description: "Um site sem complicações para calcular suas médias da Mauá.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="pt-BR" suppressHydrationWarning className={geist.variable}>
			<body className="min-h-screen antialiased flex flex-col">
				<ThemeProvider>
					<Navbar />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
