import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import WatermarkTool from "@/components/WatermarkTool";
import { watermarkFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("add-watermark");
export default function Page() {
  return (
    <ToolPageWrapper slug="add-watermark" faqItems={watermarkFAQ()}>
      <WatermarkTool />
    </ToolPageWrapper>
  );
}
