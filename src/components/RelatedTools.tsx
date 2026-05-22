import Link from "next/link";
import type { ToolMeta } from "@/lib/seo";

interface RelatedToolsProps {
  tools: ToolMeta[];
  currentSlug: string;
}

export default function RelatedTools({ tools, currentSlug }: RelatedToolsProps) {
  const filtered = tools.filter((t) => t.slug !== currentSlug);

  if (filtered.length === 0) return null;

  return (
    <section className="w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-5 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary-300)] hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-[var(--color-text)] mb-1">
              {tool.h1}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
