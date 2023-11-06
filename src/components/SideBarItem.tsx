import { TSideBarItem } from "@/common/types";
import { useDrag } from "react-dnd";

const SideBarItem = ({ data }: { data: TSideBarItem }) => {
  const [{ opacity }, drag] = useDrag({
    type: data.type,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className="border border-black rounded-sm p-2 mt-2 bg-slate-700 cursor-pointer" ref={drag} style={{ opacity }}>
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
