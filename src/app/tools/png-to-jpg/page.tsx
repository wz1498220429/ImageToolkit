import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("png-to-jpg");

export default function Page() {
  return (
    <ToolPageWrapper slug="png-to-jpg" faqItems={convertFAQ("PNG", "JPG")}>
      <ConvertTool
        fromFormat="PNG"
        toFormat="JPG"
        accept="image/png"
        outputMime="image/jpeg"
      />
    </ToolPageWrapper>
  );
}
