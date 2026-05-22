import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import PassportPhotoTool from "@/components/PassportPhotoTool";
import { passportPhotoFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("passport-photo-maker");

export default function Page() {
  return (
    <ToolPageWrapper slug="passport-photo-maker" faqItems={passportPhotoFAQ()}>
      <PassportPhotoTool />
    </ToolPageWrapper>
  );
}
