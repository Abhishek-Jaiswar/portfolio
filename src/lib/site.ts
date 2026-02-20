const fallbackSiteUrl = "http://localhost:3000";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? fallbackSiteUrl
);

