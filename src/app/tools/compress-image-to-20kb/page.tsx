import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-20kb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-20kb" faqItems={compressToSizeFAQ("20KB")}>
      <CompressToSizeTool targetKB={20} targetLabel="20KB" />
    </ToolPageWrapper>
  );
}
