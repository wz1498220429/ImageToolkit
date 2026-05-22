import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("webp-to-png");

export default function Page() {
  return (
    <ToolPageWrapper slug="webp-to-png" faqItems={convertFAQ("WebP", "PNG")}>
      <ConvertTool
        fromFormat="WebP"
        toFormat="PNG"
        accept="image/webp"
        outputMime="image/png"
      />
    </ToolPageWrapper>
  );
}
