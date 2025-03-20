"use client"; 

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth");

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider>
            {!isAuthPage && <Navbar />}
            <main style={{ paddingLeft: isAuthPage ? "0" : "300px" }}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </MantineProvider>
        </body>
        </html>
    );
}
