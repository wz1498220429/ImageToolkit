import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressToSizeTool from "@/components/CompressToSizeTool";
import { compressToSizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image-to-1mb");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-image-to-1mb" faqItems={compressToSizeFAQ("1MB")}>
      <CompressToSizeTool targetKB={1024} targetLabel="1MB" />
    </ToolPageWrapper>
  );
}
