import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ResizeTool from "@/components/ResizeTool";
import { resizeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("resize-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="resize-image" faqItems={resizeFAQ()}>
      <ResizeTool />
    </ToolPageWrapper>
  );
}
