import { Metadata } from "next";
import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ImageToPdfTool from "@/components/ImageToPdfTool";
import { pdfFAQ } from "@/lib/schemas";

export const metadata: Metadata = generateToolMetadata("png-to-pdf");

export default function Page() {
  return (
    <ToolPageWrapper slug="png-to-pdf" faqItems={pdfFAQ("PNG")}>
      <ImageToPdfTool fromFormat="PNG" accept="image/png" />
    </ToolPageWrapper>
  );
}
