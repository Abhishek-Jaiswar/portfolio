import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore featured projects, services, experience, and contact details for Abhishek Jaiswar, full-stack developer.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
