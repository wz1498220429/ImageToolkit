import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import WatermarkTool from "@/components/WatermarkTool";
export const metadata = generateToolMetadata("add-watermark");
export default function Page() {
  return (
    <ToolPageWrapper slug="add-watermark" faqItems={[]}>
      <WatermarkTool />
    </ToolPageWrapper>
  );
}
