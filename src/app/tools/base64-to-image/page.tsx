import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import Base64ToImageTool from "@/components/Base64ToImageTool";
import { base64DecodeFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("base64-to-image");

export default function Page() {
  return (
    <ToolPageWrapper slug="base64-to-image" faqItems={base64DecodeFAQ()}>
      <Base64ToImageTool />
    </ToolPageWrapper>
  );
}
