import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import PixelateImageTool from "@/components/PixelateImageTool";
import { pixelateFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("pixelate-image");
export default function Page() {
  return (
    <ToolPageWrapper slug="pixelate-image" faqItems={pixelateFAQ()}>
      <PixelateImageTool />
    </ToolPageWrapper>
  );
}
