import { Components } from "@/common/constants";
import { IComponent } from "@/common/types";
import { FC } from "react";
import PreviewContainer from "./preview-container";
import WithChildrenPreviewContainer from "./with-children-preview-container";

const ComponentPreview: FC<{ component: IComponent }> = ({ component }) => {
  if (!component) {
    console.error(`ComponentPreview unavailable for component !`);
    return;
  }

  const type = (component && component.type) || null;

  switch (type) {
    // Simple components
    case "DropZone":
    case "Button":
    case "Input":
      return <PreviewContainer component={component} type={Components[type].component} />;
    // Components with childrens
    case "Container":
    case "Row":
    case "Column":
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper={false}
          component={component}
          type={Components[type].component}
        />
      );

    default:
      return null;
  }
};

// export default memo(ComponentPreview);
export default ComponentPreview;
