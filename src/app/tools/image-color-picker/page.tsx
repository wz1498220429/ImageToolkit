import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ColorPickerTool from "@/components/ColorPickerTool";
export const metadata = generateToolMetadata("image-color-picker");
export default function Page() {
  return (
    <ToolPageWrapper slug="image-color-picker" faqItems={[]}>
      <ColorPickerTool />
    </ToolPageWrapper>
  );
}
