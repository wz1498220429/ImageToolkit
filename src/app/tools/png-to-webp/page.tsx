import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("png-to-webp");

export default function Page() {
  return (
    <ToolPageWrapper slug="png-to-webp" faqItems={convertFAQ("PNG", "WebP")}>
      <ConvertTool
        fromFormat="PNG"
        toFormat="WebP"
        accept="image/png"
        outputMime="image/webp"
      />
    </ToolPageWrapper>
  );
}
