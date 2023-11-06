import { AcceptedTypes, TGenericComponent } from "@/common/types";
import { FC, useRef } from "react";
import { useDrag } from "react-dnd";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  // backgroundColor: "white",
  cursor: "move",
};

const Component: FC<TGenericComponent> = ({ data, components, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: data.type,
    item: { type: AcceptedTypes.COMPONENT, id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  return (
    <div ref={ref} style={{ ...style, opacity }} className="h-15 p-2 bg-background-rgba">
      <div>{data.id}</div>
      <div>{component.content}</div>
    </div>
  );
};
export default Component;
