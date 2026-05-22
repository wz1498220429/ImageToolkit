import type { Metadata } from "next";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import RelatedTools from "./RelatedTools";
import FAQ from "./FAQ";
import {
  getToolMeta,
  getRelatedTools,
  generateBreadcrumbs,
} from "@/lib/seo";
import {
  faqSchema,
  breadcrumbSchema,
  softwareAppSchema,
} from "@/lib/schemas";
import type { FAQItem } from "@/lib/schemas";

interface ToolPageProps {
  slug: string;
  faqItems: FAQItem[];
  children: React.ReactNode;
}

export function generateToolMetadata(slug: string): Metadata {
  const meta = getToolMeta(slug);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(", "),
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://pixelmint.com/tools/${slug}`,
    },
  };
}

export default function ToolPageWrapper({
  slug,
  faqItems,
  children,
}: ToolPageProps) {
  const meta = getToolMeta(slug);
  if (!meta) return <>{children}</>;

  const breadcrumbs = generateBreadcrumbs(slug);
  const relatedTools = getRelatedTools(slug);

  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <JsonLd
        data={breadcrumbSchema(breadcrumbs)}
      />
      <JsonLd
        data={softwareAppSchema({
          name: meta.title,
          description: meta.description,
          operatingSystem: "Web",
          applicationCategory: "Multimedia",
          offers: { price: "0", priceCurrency: "USD" },
        })}
      />

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {meta.h1}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {meta.description}
          </p>
        </div>

        {children}

        <FAQ items={faqItems} />
        <RelatedTools tools={relatedTools} currentSlug={slug} />
      </div>
    </>
  );
}
