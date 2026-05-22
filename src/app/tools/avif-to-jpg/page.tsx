import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("avif-to-jpg");

export default function Page() {
  return (
    <ToolPageWrapper slug="avif-to-jpg" faqItems={convertFAQ("AVIF", "JPG")}>
      <ConvertTool
        fromFormat="AVIF"
        toFormat="JPG"
        accept="image/avif"
        outputMime="image/jpeg"
      />
    </ToolPageWrapper>
  );
}
