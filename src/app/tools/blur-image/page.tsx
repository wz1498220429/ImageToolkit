import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import BlurImageTool from "@/components/BlurImageTool";
import { blurFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("blur-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="blur-image" faqItems={blurFAQ()}>
      <BlurImageTool />
    </ToolPageWrapper>
  );
}
