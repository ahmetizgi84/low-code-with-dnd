import { IComponent } from "@/common/types";
import { useInteractive } from "@/hooks/useInteractive";
import React, { FunctionComponent, ComponentClass } from "react";

const PreviewContainer: React.FC<{
  component: IComponent;
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  enableVisualHelper?: boolean;
  isBoxWrapped?: boolean;
}> = ({ component, type, enableVisualHelper, isBoxWrapped, ...forwardedProps }) => {
  const { props, ref } = useInteractive(component, enableVisualHelper);

  if (component.type == "DropZone") {
    return React.createElement(type, {
      ...props,
      ...forwardedProps,
    });
  }

  /**
   * @description
   * create edilen element'e ref geçtiğimiz için
   * type={Components[type].component}'den gelen tüm komponentlerin ref alacak şekilde forward edilmesi gerekir.
   */
  const children = React.createElement(type, {
    ...props,
    ...forwardedProps,
    ref,
  });

  if (isBoxWrapped) {
    let boxProps: any = {};

    return (
      <div {...boxProps} ref={ref}>
        {children}
      </div>
    );
  }

  return children;
};

export default PreviewContainer;
