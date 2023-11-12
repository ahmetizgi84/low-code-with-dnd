import React, { FunctionComponent, ComponentClass } from "react";
import { IComponent } from "@/common/types";
import { useInteractive } from "@/hooks/useInteractive";
import ComponentPreview from "./component-preview";
import { useDropComponent } from "@/hooks/useDropComponent";
// import { DropZone } from "./drop-zone";

const WithChildrenPreviewContainer: React.FC<{
  component: IComponent;
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  enableVisualHelper?: boolean;
  isBoxWrapped?: boolean;
}> = ({ component, type, enableVisualHelper = false, isBoxWrapped = false, ...forwardedProps }) => {
  const { drop, isActive } = useDropComponent(component.id);
  const { props, innerRef } = useInteractive(component, enableVisualHelper);

  const propsElement: any = { ...props, ...forwardedProps };

  if (!isBoxWrapped) {
    propsElement.ref = drop(innerRef);
  }

  // chakra type
  // chakra type
  // chakra type
  // chakra type

  if (isActive) {
    propsElement.className = "bg-blue-500";
  }

  const children = React.createElement(
    type,
    propsElement,
    component.children.map((key: IComponent) => <ComponentPreview key={key.id} component={key} />)
  );

  if (isBoxWrapped) {
    let boxProps: any = {
      display: "inline",
    };
    return (
      <div {...boxProps} ref={drop(innerRef)}>
        {children}
      </div>
    );
  }

  return children;

  // chakra type
  // chakra type
  // chakra type
  // chakra type
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  let children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;

  const componentType = component.type;

  if (componentType == "Row") {
    return (children = React.createElement(
      type,
      propsElement,
      <>
        <DropZone id={component.id} type={component.type} className="w-10 h-auto" />
        {component.children.map((key: IComponent) => (
          <ComponentPreview key={key.id} component={key} />
        ))}
        <DropZone id={component.id} type={component.type} className="w-10 h-auto" />
      </>
    ));
  }

  if (componentType == "Column" || componentType == "Container") {
    return (children = React.createElement(
      type,
      propsElement,
      <>
        <DropZone id={component.id} type={component.type} className="h-10" />
        {component.children.map((key: IComponent) => (
          <ComponentPreview key={key.id} component={key} />
        ))}
        <DropZone id={component.id} type={component.type} className="h-10" />
      </>
    ));
  }

  children = React.createElement(
    type,
    propsElement,
    component.children.map((key: IComponent) => <ComponentPreview key={key.id} component={key} />)
  );

  return children;
  */

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

export default WithChildrenPreviewContainer;
