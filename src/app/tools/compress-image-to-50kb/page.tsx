import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-50kb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-50kb" faqItems={compressToSizeFAQ("50KB")}>
      <CompressToSizeTool targetKB={50} targetLabel="50KB" />
    </ToolPageWrapper>
  );
}
