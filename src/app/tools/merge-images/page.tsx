import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import MergeImagesTool from "@/components/MergeImagesTool";
export const metadata = generateToolMetadata("merge-images");
export default function Page() {
  return (
    <ToolPageWrapper slug="merge-images" faqItems={[]}>
      <MergeImagesTool />
    </ToolPageWrapper>
  );
}
