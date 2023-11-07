import { Fragment } from "react";

import { useDndContext } from "@/context/DndContext";
import DropZone from "@/components/DropZone";
import Row from "@/components/Row";

function Canvas() {
  const { state, handleDrop } = useDndContext();
  const layoutLength = state.layout.length;
  const layout = state.layout;
  const components = state.components;

  return (
    <div className="flex flex-1 flex-col">
      <div className="__PAGE__ flex-auto px-5 m-5 border border-blue-500 relative after:content-['Page'] after:bg-blue-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm">
        {layout.map((row, index) => {
          const currentPath = `${index}`;
          return (
            <Fragment key={row.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: layout.length,
                }}
                onDrop={handleDrop}
                className="__DROPZONE-LAYOUT-MAP__"
              />
              <Row data={row} handleDrop={handleDrop} components={components} path={currentPath} />
            </Fragment>
          );
        })}

        <DropZone
          data={{
            path: `${layoutLength}`,
            childrenCount: layoutLength,
          }}
          onDrop={handleDrop}
          className="__DROPZONE__"
        />
      </div>
    </div>
  );
}

export default Canvas;
