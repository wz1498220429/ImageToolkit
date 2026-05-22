import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-200kb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-200kb" faqItems={compressToSizeFAQ("200KB")}>
      <CompressToSizeTool targetKB={200} targetLabel="200KB" />
    </ToolPageWrapper>
  );
}
