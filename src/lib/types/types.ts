export type TProject = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  sourceCodeUrl: string | null;
  hostedUrl: string | null;
};

export type TBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TCaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  tech: string[];
  metrics: string[];
  image: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
