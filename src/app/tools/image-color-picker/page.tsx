import ToolPageWrapper, { generateToolMetadata } from "@/components/ToolPageWrapper";
import ColorPickerTool from "@/components/ColorPickerTool";
import { colorPickerFAQ } from "@/lib/schemas";
export const metadata = generateToolMetadata("image-color-picker");
export default function Page() {
  return (
    <ToolPageWrapper slug="image-color-picker" faqItems={colorPickerFAQ()}>
      <ColorPickerTool />
    </ToolPageWrapper>
  );
}
