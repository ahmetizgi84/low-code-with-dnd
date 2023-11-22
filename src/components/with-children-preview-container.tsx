import React, { FunctionComponent, ComponentClass } from "react";

import { IComponent } from "@/common/types";
import { useInteractive } from "@/hooks/useInteractive";
import ComponentPreview from "./component-preview";
import { generateLayoutWithDropzones } from "@/common/helpers";

type TWithChildrenPreviewContainer = {
  component: IComponent;
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  enableVisualHelper?: boolean;
};

const WithChildrenPreviewContainer: React.FC<TWithChildrenPreviewContainer> = ({
  component,
  type,
  enableVisualHelper,
  ...forwardedProps
}) => {
  const { children, id } = component;
  const { props, ref } = useInteractive(component, enableVisualHelper);
  const propsElement: any = { ref, ...props, ...forwardedProps };

  const updatedChildren = generateLayoutWithDropzones(children, id);

  return React.createElement(
    type,
    propsElement,
    updatedChildren.map((key: IComponent) => <ComponentPreview key={key.id} component={key} />)
  );
};

export default WithChildrenPreviewContainer;
