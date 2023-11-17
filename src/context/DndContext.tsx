import { createContext, useContext, ReactNode, useReducer, useCallback } from "react";

import { IDndContextState, IDndContextType, IComponent } from "@/common/types";
import mockLayout, { mockComponents } from "@/common/mock.data";
import { updateLayout } from "@/common/helpers";

const initialState: IDndContextState = {
  layout: mockLayout,
  components: [...mockComponents],
};

const initialValue: IDndContextType = {
  state: initialState,
} as any;

function reducer(state: IDndContextState, { type, payload }: any): IDndContextState {
  switch (type) {
    case "SET_LAYOUT":
      return { ...state, layout: payload };
    case "SET_COMPONENTS":
      return { ...state, components: payload };
    default:
      return state;
  }
}

const DndContext = createContext<IDndContextType>(initialValue);

function DndProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { layout } = state;

  const setLayout = useCallback((payload: IComponent[]) => {
    dispatch({ type: "SET_LAYOUT", payload });
  }, []);

  const setComponents = useCallback((payload: IComponent[]) => {
    dispatch({ type: "SET_COMPONENTS", payload });
  }, []);

  const addComponent = useCallback(
    (droppedItem: IComponent, dropZoneId: string, parent: string) => {
      console.log("new item is dropped into canvas...");

      console.log("droppedItem: ", droppedItem);
      console.log("dropZoneId: ", dropZoneId);
      console.log("parentId: ", parent);
    },
    [layout]
  );

  const moveComponent = useCallback(
    (droppedItem: IComponent, dropZoneId: string, parentId: string) => {
      // console.log("item is moving in canvas... only change the position");

      const layoutReplica = [...layout];

      console.log("droppedItem: ", droppedItem);
      console.log("dropZoneId: ", dropZoneId);
      console.log("parentId: ", parentId);

      const newLayoutStructure = updateLayout(layoutReplica, parentId, droppedItem.id, dropZoneId);
      setLayout(newLayoutStructure);
    },
    [layout]
  );

  const initialValue: IDndContextType = {
    state,
    setLayout,
    setComponents,
    addComponent,
    moveComponent,
  };

  return <DndContext.Provider value={initialValue}>{children}</DndContext.Provider>;
}

const useDndContext = () => {
  const context = useContext(DndContext);
  if (context === undefined) {
    throw new Error("useDndContext must be used within a DndProvider");
  }
  return context;
};

export { useDndContext, DndProvider };
