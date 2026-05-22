import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-10kb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-10kb" faqItems={compressToSizeFAQ("10KB")}>
      <CompressToSizeTool targetKB={10} targetLabel="10KB" />
    </ToolPageWrapper>
  );
}
