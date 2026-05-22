import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import GrayscaleTool from "@/components/GrayscaleTool";
import { grayscaleFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("image-to-grayscale");

export default function Page() {
  return (
    <ToolPageWrapper slug="image-to-grayscale" faqItems={grayscaleFAQ()}>
      <GrayscaleTool />
    </ToolPageWrapper>
  );
}
