import type { Metadata } from "next";
import { Playfair_Display, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import FixedElements from "./components/FixedElements";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Jaiswar | Portfolio",
  description: "Personal portfolio showcasing my work and experience",
  keywords: ["portfolio", "developer", "software engineer", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#1A202C] text-[#A0AEC0]`}
      >
        <div className="relative min-h-screen noise-overlay">
          <div className="fixed inset-0 bg-[#1A202C] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A202C] via-[#1A202C] to-[#2D3748]"></div>
          <div className="relative">
            {children}
            <FixedElements />
          </div>
        </div>
      </body>
    </html>
  );
}
