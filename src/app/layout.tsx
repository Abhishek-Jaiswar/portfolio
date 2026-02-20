import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteUrl } from "@/src/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abhishek Jaiswar | Full-Stack Developer",
    template: "%s | Abhishek Jaiswar",
  },
  description:
    "Portfolio of Abhishek Jaiswar, a full-stack developer building production-grade web apps with Next.js, Node.js, Go, and PostgreSQL.",
  keywords: [
    "Abhishek Jaiswar",
    "Full-Stack Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Go Developer",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Abhishek Jaiswar", url: siteUrl }],
  creator: "Abhishek Jaiswar",
  publisher: "Abhishek Jaiswar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Abhishek Jaiswar | Full-Stack Developer",
    description:
      "Portfolio of Abhishek Jaiswar, a full-stack developer building production-grade web apps with Next.js, Node.js, Go, and PostgreSQL.",
    siteName: "Abhishek Jaiswar Portfolio",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Abhishek Jaiswar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Jaiswar | Full-Stack Developer",
    description:
      "Full-stack developer building performant digital products and writing about modern web engineering.",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
};

import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/src/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abhishek Jaiswar",
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    sameAs: [
      "https://github.com/abhishekjaiswar",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} font-sans antialiased selection:bg-zinc-500/30`}
      >
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grain-overlay" />
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
