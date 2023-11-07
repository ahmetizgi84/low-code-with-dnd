import { TSideBarItem } from "@/common/types";
import { useDrag } from "react-dnd";
import { GripVertical } from "lucide-react";

const DraggableItem = ({ data }: { data: TSideBarItem }) => {
  const [{ opacity }, drag] = useDrag({
    type: data.type,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  let boxProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
    ref: drag,
    className: "rounded-sm p-2 mt-2 bg-slate-700 cursor-pointer hover:translate-x-1 transition flex items-center",
    style: { opacity },
  };

  return (
    <div {...boxProps}>
      <GripVertical size={20} className="mr-2" />
      <span>{data.component.type}</span>
    </div>
  );
};
export default DraggableItem;
