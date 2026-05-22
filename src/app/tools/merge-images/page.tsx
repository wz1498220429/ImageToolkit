import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import MergeImagesTool from "@/components/MergeImagesTool";
import { mergeFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("merge-images");
export default function Page() {
  return (
    <ToolPageWrapper slug="merge-images" faqItems={mergeFAQ()}>
      <MergeImagesTool />
    </ToolPageWrapper>
  );
}
