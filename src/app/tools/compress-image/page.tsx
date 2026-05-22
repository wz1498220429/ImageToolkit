import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressTool from "@/components/CompressTool";
import { compressFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-image");

export default function CompressImagePage() {
  return (
    <ToolPageWrapper slug="compress-image" faqItems={compressFAQ()}>
      <CompressTool />
    </ToolPageWrapper>
  );
}
