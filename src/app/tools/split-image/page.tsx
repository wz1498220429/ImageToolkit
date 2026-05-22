import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import SplitImageTool from "@/components/SplitImageTool";
import { splitImageFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("split-image");
export default function Page() {
  return (
    <ToolPageWrapper slug="split-image" faqItems={splitImageFAQ()}>
      <SplitImageTool />
    </ToolPageWrapper>
  );
}
