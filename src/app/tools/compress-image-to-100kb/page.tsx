import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-100kb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-100kb" faqItems={compressToSizeFAQ("100KB")}>
      <CompressToSizeTool targetKB={100} targetLabel="100KB" />
    </ToolPageWrapper>
  );
}
