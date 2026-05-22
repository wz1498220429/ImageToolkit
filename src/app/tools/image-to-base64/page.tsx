import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ImageToBase64Tool from "@/components/ImageToBase64Tool";
import { base64FAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("image-to-base64");

export default function Page() {
  return (
    <ToolPageWrapper slug="image-to-base64" faqItems={base64FAQ()}>
      <ImageToBase64Tool />
    </ToolPageWrapper>
  );
}
