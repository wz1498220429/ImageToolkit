import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ConvertTool from "@/components/ConvertTool";
import { convertFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("heic-to-jpg");

export default function Page() {
  return (
    <ToolPageWrapper slug="heic-to-jpg" faqItems={convertFAQ("HEIC", "JPG")}>
      <ConvertTool
        fromFormat="HEIC"
        toFormat="JPG"
        accept="image/heic,image/heif"
        outputMime="image/jpeg"
      />
    </ToolPageWrapper>
  );
}
