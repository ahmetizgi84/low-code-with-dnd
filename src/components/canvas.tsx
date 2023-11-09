import { createPage } from "@/common";
import { useDndContext } from "@/context/DndContext";

function Canvas() {
  const { state } = useDndContext();
  const { layout } = state;

  return (
    <div className="flex flex-1 flex-col">
      <div className="__PAGE__ flex-auto p-3 m-5 border border-blue-500 relative after:content-['Page'] after:bg-blue-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm">
        {createPage(layout)}
      </div>
    </div>
  );
}

export default Canvas;
