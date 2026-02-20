import { NextResponse } from "next/server";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  updated_at: string;
  open_graph_image_url?: string;
}

const GITHUB_USERNAME = "Abhishek-Jaiswar";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Use token from env if available (avoids rate-limiting)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=public`,
      {
        headers,
        // Revalidate every 10 minutes
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status}`);
    }

    const allRepos: GitHubRepo[] = await res.json();

    // Filter out forks and sort by stars descending
    const repos = allRepos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12); // Show top 12

    return NextResponse.json({ success: true, repos });
  } catch (error) {
    console.error("GET /api/github-repos error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch GitHub repos" },
      { status: 500 }
    );
  }
}
