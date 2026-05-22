import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ImageToPdfTool from "@/components/ImageToPdfTool";
import { pdfFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("jpg-to-pdf");

export default function Page() {
  return (
    <ToolPageWrapper slug="jpg-to-pdf" faqItems={pdfFAQ("JPG")}>
      <ImageToPdfTool fromFormat="JPG" accept="image/jpeg" />
    </ToolPageWrapper>
  );
}
