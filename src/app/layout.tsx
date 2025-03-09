import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
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
              WanderNest
              <span className="after:content-[''] after:absolute after:w-20 after:h-[1px] after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2" />
            </h1>
          </Link>
        </nav>

        {children}
        <footer className="w-full text-white z-50 text-center flex flex-col p-4 bg-black">
          <h2 className="text-2xl mb-3">Connect with Us</h2>

          <div className="flex justify-center space-x-4 mb-3">
            <a
              href="https://www.facebook.com/lykke.travel"
              target="_blank"
              rel="noopener noreferrer"
              className="color-light hover:translate-y-[-5px] transition-transform duration-300"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://www.instagram.com/lykke.travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="color-light hover:translate-y-[-5px] transition-transform duration-300"
            >
              <RiInstagramFill size={24} />
            </a>

            <a
              href="https://www.linkedin.com/company/travel-lykke/"
              target="_blank"
              rel="noopener noreferrer"
              className="color-light hover:translate-y-[-5px] transition-transform duration-300"
            >
              <FaLinkedin size={24} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCIAwGvNuqlh5n1lFKXG2GaA"
              target="_blank"
              rel="noopener noreferrer"
              className="color-light hover:translate-y-[-5px] transition-transform duration-300"
            >
              <FaYoutube size={24} />
            </a>
          </div>

          <p className="text-sm text-center w-full">
            Copyright &copy; WanderNest Pvt Ltd. {new Date().getFullYear()}
          </p>
        </footer>
      </body>
    </html>
  );
}
