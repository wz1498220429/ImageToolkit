import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import SplitImageTool from "@/components/SplitImageTool";
export const metadata = generateToolMetadata("split-image");
export default function Page() {
  return (
    <ToolPageWrapper slug="split-image" faqItems={[]}>
      <SplitImageTool />
    </ToolPageWrapper>
  );
}
