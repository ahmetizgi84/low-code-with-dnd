import { useRef } from "react";
import { useDrag } from "react-dnd";

import { IComponent } from "@/common/types";
import { useDndContext } from "@/context/DndContext";

export const useInteractive = (component: IComponent, enableVisualHelper: boolean = false) => {
  const { removeComponent } = useDndContext();

  const [, drag] = useDrag({
    type: component.type,
    item: { ...component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => {
      /**
       * @description
       * dragging esnasında drag edilen komponenti diziden çıkarmak drop esansındaki index sorununu ortadan kaldırıyor
       * Fakat dropzone haricinde boş bir alana bırakılan komponent layout state'inden kalıcı olarak çıkarılmış oluyor.
       * Komponent boş alana bırakıldığında layout'un önceki haline gelmesi daha uygun olabilir.
       */
      if (component.id == monitor.getItem().id) {
        removeComponent(component.id);
        return true;
      }
      return false;
    },
    end: (draggedItem) => {
      console.log("drag end: ", draggedItem);
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  let props = {
    ...component.props,
  };
  drag(ref);

  if (enableVisualHelper) {
    props = {
      ...props,
      className: `border border-dashed border-gray-800 relative transition duration-150 ease-in-out after:bg-gray-800/30 after:absolute after:w-20 after:h-3 after:text-center after:-top-0 after:-left-[1px] after:text-white after:text-[8px] after:content-['${component.type}']`,
    };
  }

  return { props, ref, drag };
};
