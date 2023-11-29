import { createContext, useContext, ReactNode, useReducer, useCallback } from "react";
import cloneDeep from "lodash/cloneDeep";

import { IDndContextState, IDndContextType, IComponent } from "@/common/types";
import mockLayout, { mockComponents } from "@/common/mock.data";
import { removeObjectById, updateLayout } from "@/common/helpers";

const initialState: IDndContextState = {
  layout: mockLayout,
  components: [...mockComponents],
  enableVisualHelper: true,
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
    case "SET_VISUAL_HELPER":
      return { ...state, enableVisualHelper: payload };
    default:
      return state;
  }
}

const DndContext = createContext<IDndContextType>(initialValue);

function DndProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { layout, enableVisualHelper } = state;

  const setLayout = useCallback((payload: IComponent[]) => {
    dispatch({ type: "SET_LAYOUT", payload });
  }, []);

  const setComponents = useCallback((payload: IComponent[]) => {
    dispatch({ type: "SET_COMPONENTS", payload });
  }, []);

  const addComponent = useCallback(
    (droppedItem: IComponent, dropZoneId: string, parentId: string) => {
      // console.log("new item is dropped into canvas...");
      const layoutCopy = cloneDeep(layout); // keep the original array unchanged.

      const newLayoutStructure = updateLayout(layoutCopy, parentId, droppedItem, dropZoneId);
      setLayout(newLayoutStructure);
    },
    [layout]
  );

  const removeComponent = useCallback(
    (componentId: string) => {
      const layoutCopy = cloneDeep(layout); // keep the original array unchanged.

      const newLayoutStructure = removeObjectById(layoutCopy, componentId);
      setLayout(newLayoutStructure);
    },
    [layout]
  );

  const toggleVisualHelper = useCallback(() => {
    dispatch({ type: "SET_VISUAL_HELPER", payload: !enableVisualHelper });
  }, [enableVisualHelper]);

  const initialValue: IDndContextType = {
    state,
    setLayout,
    setComponents,
    addComponent,
    removeComponent,
    toggleVisualHelper,
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
