import { MouseEvent, createElement, useRef } from "react";
import { useDrag } from "react-dnd";

import { AcceptedTypes, ComponentTypes, TComponent } from "@/common/types";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import { Input } from "@/components/ui/input";
import Davatar from "@/components/ui/davatar";
import { Label } from "@/components/ui/label";

const readyComponents: { [key in ComponentTypes]: any } = {
  [ComponentTypes.ROW]: Row,
  [ComponentTypes.COLUMN]: Column,
  [ComponentTypes.BUTTON]: Button,
  [ComponentTypes.INPUT]: Input,
  [ComponentTypes.AVATAR]: Davatar,
  [ComponentTypes.LABEL]: Label,
};

export const useInteractive = (component: TComponent, path: string) => {
  const ref = useRef(null);

  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation();
      // dispatch.components.hover(component.id)
    },
    onMouseOut: () => {
      // dispatch.components.unhover()
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      alert(`Component: ${JSON.stringify(component)}`);
      // dispatch.components.select(component.id)
    },
    size: "sm",
    variant: "secondary",
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      // if (focusInput === false) {
      //   dispatch.app.toggleInputText()
      // }
    },
  };

  const [{ isDragging }, drag] = useDrag({
    type: component.type,
    item: { type: AcceptedTypes.COMPONENT, id: component.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);
  props.style = {
    opacity: isDragging ? 0 : 1,
  };

  const content =
    component.type == ComponentTypes.ROW ||
    component.type == ComponentTypes.COLUMN ||
    component.type == ComponentTypes.INPUT
      ? undefined
      : component.content;

  const element = createElement(
    readyComponents[component.type],
    {
      key: component.id,
      ...props,
      ref: ref,
    },
    content
  );

  return { props, element };
};
