import uniqid from "uniqid";
import { useDrop, DropTargetMonitor } from "react-dnd";

import { acceptedComponents } from "@/common/mock.data";
import { IComponent } from "@/common/types";
import { useDndContext } from "@/context/DndContext";

export const useDropComponent = (id: string, parent: string, canDrop: boolean = true) => {
  const { addComponent } = useDndContext();

  //
  const [{ isOver }, drop] = useDrop({
    accept: acceptedComponents,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: IComponent, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      const generatedId = `${item.type}-${uniqid()}`;
      item.id = generatedId;
      item.props.id = generatedId;

      addComponent(item, id, parent);
    },
    canDrop: () => canDrop,
  });

  const isActive = isOver && canDrop ? "bg-red-100" : undefined;

  return { drop, isActive };
};
