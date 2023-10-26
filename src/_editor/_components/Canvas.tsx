import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

function Canvas({ children }: { children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-50 flex-1 ml-3 mr-3 mb-3 border-2 border-blue-500">
      {children}
    </div>
  );
}

export default Canvas;
