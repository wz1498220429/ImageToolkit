import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ImageToSvgTool from "@/components/ImageToSvgTool";
export const metadata = generateToolMetadata("image-to-svg");
export default function Page() {
  return (
    <ToolPageWrapper slug="image-to-svg" faqItems={[]}>
      <ImageToSvgTool />
    </ToolPageWrapper>
  );
}
