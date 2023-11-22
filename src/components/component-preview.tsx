import { Components } from "@/common/constants";
import { IComponent } from "@/common/types";
import { FC } from "react";
import PreviewContainer from "./preview-container";
import WithChildrenPreviewContainer from "./with-children-preview-container";
import { useDndContext } from "@/context/DndContext";

const ComponentPreview: FC<{ component: IComponent }> = ({ component }) => {
  const {
    state: { enableVisualHelper },
  } = useDndContext();

  if (!component) {
    console.error(`ComponentPreview unavailable for component !`);
    return;
  }

  const type = (component && component.type) || null;
  const componentType = Components[type].component;
  const isDroppable = Components[type].isDroppable;

  if (!isDroppable) {
    return <PreviewContainer component={component} type={componentType} enableVisualHelper={false} />;
  }

  return (
    <WithChildrenPreviewContainer component={component} type={componentType} enableVisualHelper={enableVisualHelper} />
  );
};

// export default memo(ComponentPreview);
export default ComponentPreview;
