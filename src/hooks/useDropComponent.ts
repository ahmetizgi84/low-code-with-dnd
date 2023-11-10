import { acceptedComponents } from "@/common/mock.data";
import { useDndContext } from "@/context/DndContext";
import { useDrop, DropTargetMonitor } from "react-dnd";

export const useDropComponent = (id: string, canDrop: boolean = true) => {
  const { handleDrop } = useDndContext();

  //
  const [{ isOver }, drop] = useDrop({
    accept: acceptedComponents,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: any, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      handleDrop(item, id);
    },
    canDrop: () => canDrop,
  });

  const isActive = isOver && canDrop ? "bg-red-100" : undefined;

  return { drop, isActive };
};
