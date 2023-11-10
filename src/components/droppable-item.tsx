import type { FC, ReactNode } from "react";

import { ComponentTypes } from "@/common/types";
import { DropZone } from "./drop-zone";

type TDropZone = {
  id: string;
  type: ComponentTypes;
  children: ReactNode;
  className?: string;
};

const DroppableItem: FC<TDropZone> = ({ id, children, type }) => {
  switch (type) {
    case "Container":
      return (
        <>
          {/* <DropZone id={id} className="h-10" /> */}
          {children}
          {/* <DropZone id={id} className="h-10" /> */}
        </>
      );
    case "Row":
      return (
        <>
          {/* <DropZone id={id} type={type} className="h-10" /> */}
          {children}
          <DropZone id={id} type={type} className="h-10" />
        </>
      );
    case "Column":
      return (
        <>
          <DropZone id={id} type={type} className="w-10 h-auto" />
          {children}
          <DropZone id={id} type={type} className="w-10 h-auto" />
        </>
      );

    default:
      return (
        <>
          <DropZone id={id} type={type} className="h-10" />
          {children}
          <DropZone id={id} type={type} className="h-10" />
        </>
      );
  }
};
export { DroppableItem };
