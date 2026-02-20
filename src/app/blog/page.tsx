import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on Next.js, system design, backend engineering, and full-stack development by Abhishek Jaiswar.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
