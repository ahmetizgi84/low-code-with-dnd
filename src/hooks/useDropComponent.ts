import { acceptedComponents } from "@/common/mock.data";
import { ComponentItemProps } from "@/common/types";
import { useDrop, DropTargetMonitor } from "react-dnd";

export const useDropComponent = (componentId: string, canDrop: boolean = true) => {
  const [{ isOver }, drop] = useDrop({
    accept: acceptedComponents,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      console.log("dropped item: ", item);
      console.log("componentId: ", componentId);

      if (item.isMoved) {
        console.log("current component is moving...: ", item.isMoved);
        // dispatch.components.moveComponent({
        //   parentId: componentId,
        //   componentId: item.id,
        // });
      } else if (item.isMeta) {
        console.log("current item isMeta: ", item.isMeta);
        // dispatch.components.addMetaComponent(builder[item.type](componentId));
      } else {
        console.log("new component will be added !");
        // dispatch.components.addComponent({
        //   parentName: componentId,
        //   type: item.type,
        //   rootParentType: item.rootParentType,
        // });
      }
    },
    canDrop: () => canDrop,
  });

  const isActive = isOver && canDrop ? "bg-red-100" : undefined;

  return { drop, isActive };
};

/*
import { acceptedComponents } from "@/common/mock.data";
// import { useDndContext } from "@/context/DndContext";
import { useDrop, DropTargetMonitor } from "react-dnd";

export const useDropComponent = (id: string, canDrop: boolean = true) => {
  // const { handleDrop } = useDndContext();

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

      // handleDrop(item, id);
    },
    canDrop: () => canDrop,
  });

  const isActive = isOver && canDrop ? "bg-red-100" : undefined;

  return { drop, isActive };
};
*/
