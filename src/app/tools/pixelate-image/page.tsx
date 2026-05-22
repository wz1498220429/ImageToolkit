import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import PixelateImageTool from "@/components/PixelateImageTool";
export const metadata = generateToolMetadata("pixelate-image");
export default function Page() {
  return (
    <ToolPageWrapper slug="pixelate-image" faqItems={[]}>
      <PixelateImageTool />
    </ToolPageWrapper>
  );
}
