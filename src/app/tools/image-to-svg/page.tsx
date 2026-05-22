import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ImageToSvgTool from "@/components/ImageToSvgTool";
import { imageToSvgFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("image-to-svg");
export default function Page() {
  return (
    <ToolPageWrapper slug="image-to-svg" faqItems={imageToSvgFAQ()}>
      <ImageToSvgTool />
    </ToolPageWrapper>
  );
}
