import { Monitor, Smartphone, Tablet } from "lucide-react";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Canvas from "@/_editor/_components/Canvas";
import Panel from "./Panel";
import Sidebar from "./Sidebar";
import TestComponent from "@/_editor/_components/TestComponent";

function Apps() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex h-full">
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

          <Canvas>{isDropped ? <TestComponent /> : "Drop here"}</Canvas>
        </div>

        <Panel />
      </main>
    </DndContext>
  );
}

export default Apps;
