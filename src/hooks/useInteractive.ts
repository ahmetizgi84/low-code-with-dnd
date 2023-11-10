import { IComponent } from "@/common/types";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export const useInteractive = (component: IComponent, enableVisualHelper: boolean = false) => {
  const [, drag] = useDrag({
    type: component.type,
    // item: { id: component.id, type: component.type, isMoved: true },
    item: { ...component, isMoved: true },
  });

  const ref = useRef<HTMLDivElement>(null);
  let props = {
    ...component.props,
  };
  drag(ref);

  if (enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4,
    };
  }

  return { props, ref, drag };
};
