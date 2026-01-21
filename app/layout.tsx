import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

// const lato = Lato({
//     subsets: ['latin'],
//     weight: ['400', '700'],
//     variable: '--font-lato',
// });

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
        <html lang="en" className={`${montserrat.variable}`}>
            <body>
                <ClientProviders>
                    <Navbar />
                    <div className="page-transition min-h-screen">{children}</div>
                    <Footer />
                </ClientProviders>
            </body>
        </html>
    );
}
