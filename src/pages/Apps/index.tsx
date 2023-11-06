import { Monitor, Smartphone, Tablet } from "lucide-react";
import uniqid from "uniqid";
import React, { useCallback } from "react";

import { Button } from "@/components/ui/button";
import Panel from "./Panel";
import Sidebar from "./Sidebar";
import { useDndContext } from "@/context/DndContext";
import DropZone from "@/components/DropZone";
import { AcceptedTypes, TLayout } from "@/common/types";
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from "@/common/helpers";
import Row from "@/components/Row";

function Apps() {
  const { state, setLayout, setComponents } = useDndContext();
  const layoutLength = state.layout.length;
  const layout = state.layout;
  const components = state.components;

  const handleDrop = useCallback(
    (dropZone: any, item: any) => {
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, children: null };

      if (item.type === AcceptedTypes.COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === AcceptedTypes.SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: uniqid(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: AcceptedTypes.COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });

        const chld = handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem);
        console.log("chld", chld);

        setLayout(chld);
        // setLayout(handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem));
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(handleMoveWithinParent(layout, splitDropZonePath, splitItemPath));
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem));
        return;
      }

      // 3. Move + Create
      setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem));
    },
    [layout, components]
  );

  const renderRow = (row: TLayout, currentPath: string) => {
    return <Row key={row.id} data={row} handleDrop={handleDrop} components={components} path={currentPath} />;
  };

  return (
    <main className="flex min-h-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="control h-12 px-4 flex justify-between items-center">
          <p>Responsive Control</p>
          <div className="flex items-center">
            <div>
              <Button size="icon" variant="ghost" className="w-8 h-8">
                <Monitor size={14} />
              </Button>
            </div>

            <div>
              <Button size="icon" variant="ghost" className="w-8 h-8">
                <Tablet size={14} />
              </Button>
            </div>
            <div>
              <Button size="icon" variant="ghost" className="w-8 h-8">
                <Smartphone size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex-auto px-5 m-5 border border-green-500 relative after:content-['Page'] after:bg-green-500 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm">
            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

            {layout.map((row, index) => {
              const currentPath = `${index}`;
              return (
                <React.Fragment key={row.id}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length,
                    }}
                    onDrop={handleDrop}
                  />
                  {renderRow(row, currentPath)}
                </React.Fragment>
              );
            })}

            <DropZone
              data={{
                path: `${layoutLength}`,
                childrenCount: layoutLength,
              }}
              onDrop={handleDrop}
              className="dropZone"
            />
          </div>
        </div>
      </div>

      <Panel />
    </main>
  );
}

export default Apps;
