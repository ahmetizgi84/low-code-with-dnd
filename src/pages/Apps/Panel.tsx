import Draggable from "@/_editor/_components/Draggable";
import TestComponent from "@/_editor/_components/TestComponent";

function Panel() {
  return (
    <div className="flex-initial w-[310px] bg-background-rgba h-full px-4">
      <div className="flex items-center gap-2 py-2">
        <div className="flex-1">
          <p className="text-sm font-semibold">Ready to use components</p>

          <div className="mt-4 flex flex-col space-y-2">
            <Draggable>
              <TestComponent />
            </Draggable>
            <Draggable>
              <TestComponent />
            </Draggable>
            <Draggable>
              <TestComponent />
            </Draggable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
