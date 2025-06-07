import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FixedElements from "./components/FixedElements";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Your Name | Portfolio",
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
        className={`${inter.variable} font-sans antialiased bg-[#0a192f] text-[#8892b0]`}
      >
        <div className="relative min-h-screen">
          <div className="fixed inset-0 bg-[#0a192f] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a192f] via-[#0a192f] to-[#112240]"></div>
          <div className="relative">
            {children}
            <FixedElements />
          </div>
        </div>
      </body>
    </html>
  );
}
