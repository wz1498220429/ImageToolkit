import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import InstagramResizerTool from "@/components/InstagramResizerTool";
import { resizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("instagram-image-resizer");

export default function Page() {
  return (
    <ToolPageWrapper slug="instagram-image-resizer" faqItems={resizeFAQ()}>
      <InstagramResizerTool />
    </ToolPageWrapper>
  );
}
