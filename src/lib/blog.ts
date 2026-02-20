export type BlogPostMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
};

export const blogPosts: BlogPostMeta[] = [
  {
    id: "1",
    title: "How to use WebSockets in Next.js",
    slug: "websockets-in-nextjs",
    excerpt:
      "Learn how to implement real-time features using WebSockets in a Next.js application, from server-side setup to client-side integration with best practices.",
    date: "2026-01-13",
    readTime: "8 min read",
    category: "WebSockets",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Mastering Framer Motion Animations",
    slug: "framer-motion-animations",
    excerpt:
      "Bring your React applications to life with production-ready animations and transitions. Covers variants, gestures, layout animations, and performance tips.",
    date: "2026-01-10",
    readTime: "6 min read",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "3",
    title: "Building Scalable Microservices with Go",
    slug: "scalable-microservices",
    excerpt:
      "An in-depth look at designing and deploying microservices that can handle millions of requests using Go, Docker, and modern messaging patterns.",
    date: "2026-01-05",
    readTime: "12 min read",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Next.js App Router: A Complete Guide",
    slug: "nextjs-app-router-guide",
    excerpt:
      "Everything you need to know about the Next.js App Router, including layouts, server components, streaming, parallel routes, and advanced data fetching patterns.",
    date: "2025-12-28",
    readTime: "10 min read",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2000&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "5",
    title: "System Design: Building a URL Shortener at Scale",
    slug: "system-design-url-shortener",
    excerpt:
      "A step-by-step system design walkthrough on databases, caching layers, consistent hashing, and rate limiting for a URL shortener handling high traffic.",
    date: "2025-12-20",
    readTime: "15 min read",
    category: "System Design",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
    featured: false,
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
