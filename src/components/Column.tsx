import React, { useRef, FC } from "react";
import { useDrag } from "react-dnd";
import DropZone from "./DropZone";
import Component from "./Component";
import { AcceptedTypes, TLayout, TRowCol } from "@/common/types";

const style = {};
const Column: FC<TRowCol> = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: data.type,
    item: {
      type: AcceptedTypes.COLUMN,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component: TLayout, currentPath: string) => {
    return <Component key={component.id} data={component} components={components} path={currentPath} />;
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="__COLUMN__ py-2 px-4 bg-[var(--background)] cursor-move border relative border-blue-500 one-a-hundred p-2 after:content-['Column'] after:bg-blue-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm"
    >
      {data.id}
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
              }}
              onDrop={handleDrop}
              className="__DROPZONE__"
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length,
        }}
        onDrop={handleDrop}
        className="isLast __DROPZONE__"
      />
    </div>
  );
};
export default Column;
