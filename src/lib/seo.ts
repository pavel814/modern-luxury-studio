type HeadInput = {
  title: string;
  description: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

export function pageHead({ title, description, type = "website", jsonLd, noindex }: HeadInput) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:locale", content: "ru_BY" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return {
    meta,
    scripts: blocks.map((b) => ({
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", ...b }),
    })),
  };
}
