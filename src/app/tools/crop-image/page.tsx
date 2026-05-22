import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import CropTool from "@/components/CropTool";
import { cropFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("crop-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="crop-image" faqItems={cropFAQ()}>
      <CropTool />
    </ToolPageWrapper>
  );
}
