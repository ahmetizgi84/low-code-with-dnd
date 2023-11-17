import { useDndContext } from "@/context/DndContext";
// import { useDropComponent } from "@/hooks/useDropComponent";
import cn from "classnames";
import ComponentPreview from "./component-preview";

function Canvas() {
  // const { drop, isActive } = useDropComponent("Container");
  const { state } = useDndContext();

  const { layout } = state;

  return (
    <div className="flex flex-1 flex-col">
      <div
        // ref={drop}
        className={cn(
          "__PAGE__ flex-auto p-3 m-5 border border-blue-500 relative after:content-['Page'] after:bg-blue-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm"
          // { active: isActive }
        )}
      >
        {layout.map((component) => (
          <ComponentPreview key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}

export default Canvas;
