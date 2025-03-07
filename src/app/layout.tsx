import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 left-0 w-full z-50 flex p-2">
          <Link href="/">
            <h1 className="relative text-xl font-bold text-white tracking-tight drop-shadow-lg cursor-pointer px-6 py-2 rounded-md">
              <span className="before:content-[''] before:absolute before:w-20 before:h-[1px] before:bg-white before:-top-1 before:left-1/2 before:-translate-x-1/2" />
              Travel Lykke
              <span className="after:content-[''] after:absolute after:w-20 after:h-[1px] after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2" />
            </h1>
          </Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
