import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import FlipImageTool from "@/components/FlipImageTool";
import { flipFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("flip-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="flip-image" faqItems={flipFAQ()}>
      <FlipImageTool />
    </ToolPageWrapper>
  );
}
