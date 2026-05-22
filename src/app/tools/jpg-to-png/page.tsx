import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("jpg-to-png");

export default function Page() {
  return (
    <ToolPageWrapper slug="jpg-to-png" faqItems={convertFAQ("JPG", "PNG")}>
      <ConvertTool
        fromFormat="JPG"
        toFormat="PNG"
        accept="image/jpeg"
        outputMime="image/png"
      />
    </ToolPageWrapper>
  );
}
