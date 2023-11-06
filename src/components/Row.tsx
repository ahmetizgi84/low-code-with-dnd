import React, { useRef, FC } from "react";
import { useDrag } from "react-dnd";
import DropZone from "./DropZone";
import Column from "./Column";
import { AcceptedTypes, TLayout, TRowCol } from "@/common/types";

const style = {};

const Row: FC<TRowCol> = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: data.type,
    item: {
      type: AcceptedTypes.ROW,
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

  const renderColumn = (column: TLayout, currentPath: string) => {
    return <Column key={column.id} data={column} components={components} handleDrop={handleDrop} path={currentPath} />;
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="px-4 py-2 bg-[var(--background)] cursor-move border border-red-500 p-0 relative after:content-['Row'] after:bg-red-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm"
    >
      {data.id}
      <div className="flex px-0 py-5">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="w-10 h-auto"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          className="w-10 h-auto isLast"
        />
      </div>
    </div>
  );
};
export default Row;
