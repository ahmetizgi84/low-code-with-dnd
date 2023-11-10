import uniqid from "uniqid";

import { mockComponents } from "@/common/mock.data";
import { ComponentTypes, IComponent } from "@/common/types";
import { useDndContext } from "@/context/DndContext";
import { useDrop, DropTargetMonitor } from "react-dnd";

export const useDropComponent = (parent: ComponentTypes, canDrop: boolean = true) => {
  const { handleDrop } = useDndContext();
  //
  const [{ isOver }, drop] = useDrop({
    accept: mockComponents,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: any, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      if (parent == "Container") {
        const newComponent: IComponent = {
          type: item.type,
          parent,
          id: `${item.type}-${uniqid()}`,
          children: [],
          props: {},
        };
        handleDrop(newComponent, parent, "container");
      }

      // Rest...
    },
    canDrop: () => canDrop,
  });

  const isActive = isOver && canDrop ? "bg-red-500" : undefined;

  return { drop, isActive };
};
