import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import RotateTool from "@/components/RotateTool";
import { rotateFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("rotate-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="rotate-image" faqItems={rotateFAQ()}>
      <RotateTool />
    </ToolPageWrapper>
  );
}
