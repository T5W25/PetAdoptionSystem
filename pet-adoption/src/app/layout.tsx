"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/ShelterPetList/Navbar/Navbar";
import Footer from "../components/Footer";
import { UserProvider, useUser } from './context/UserContext'; 

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth");
    const { userId } = useUser(); 

    return (
        <MantineProvider>
            {!isAuthPage && <Navbar userID={userId ?? ""} />}
            <main>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </MantineProvider>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
            <LayoutContent>{children}</LayoutContent>
        </UserProvider>
        </body>
        </html>
    );
}
