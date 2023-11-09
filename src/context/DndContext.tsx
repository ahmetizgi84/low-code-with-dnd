import { createContext, useContext, ReactNode, useReducer, useCallback } from "react";

import { handleMoveSidebarComponentIntoLayout } from "@/common/helpers";
import { IDndContextState, IDndContextType, IComponent } from "@/common/types";
import mockResponse, { mockSideBarItems } from "@/common/mock.data";

const initialState: IDndContextState = {
  layout: mockResponse,
  components: [...mockSideBarItems],
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

  const setLayout = useCallback((payload: IComponent) => {
    dispatch({ type: "SET_LAYOUT", payload });
  }, []);

  const setComponents = useCallback((payload: IComponent[]) => {
    dispatch({ type: "SET_COMPONENTS", payload });
  }, []);

  const handleDrop = useCallback(
    (newItem: IComponent, dropZoneId: string) => {
      const newLayout = handleMoveSidebarComponentIntoLayout(layout, newItem, dropZoneId);
      setLayout(newLayout);
    },
    [layout]
  );

  /*
  const handleDrop = useCallback(
    (dropZone: any, item: any) => {
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
      console.log("itemm: ", item);

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
          ...item,
          id: newComponent.id,
          type: item.component.type,
          // type: AcceptedTypes.COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });

        setLayout(handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem));
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
  */

  const initialValue: IDndContextType = {
    state,
    setLayout,
    setComponents,
    handleDrop,
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
