import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CompressTool from "@/components/CompressTool";
import { compressFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("compress-png");

export default function Page() {
  return (
    <ToolPageWrapper slug="compress-png" faqItems={compressFAQ()}>
      <CompressTool />
    </ToolPageWrapper>
  );
}
