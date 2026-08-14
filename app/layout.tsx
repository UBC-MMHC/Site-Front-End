import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	style: ["italic"],
	variable: "--font-playfair",
});

export const metadata: Metadata = {
	title: "UBC Men's Mental Health Club",
	description: "Community, Growth, Grit",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${manrope.variable} ${playfair.variable}`}
			suppressHydrationWarning
		>
			<body>
				<ClientProviders>
					<Navbar />
					<div className="page-transition min-h-screen">{children}</div>
					<SiteFooter />
				</ClientProviders>
			</body>
		</html>
	);
}
