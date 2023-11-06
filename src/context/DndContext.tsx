import { createContext, useContext, ReactNode, useReducer, useCallback } from "react";
import uniqid from "uniqid";

import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from "@/common/helpers";
import { AcceptedTypes, IDndContextState, IDndContextType, TComponents, TLayout } from "@/common/types";

const initialState: IDndContextState = {
  // layout: [
  //   {
  //     type: AcceptedTypes.ROW,
  //     id: "row0",
  //     children: [
  //       {
  //         type: AcceptedTypes.COLUMN,
  //         id: "column0",
  //         children: [
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component0",
  //           },
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component1",
  //           },
  //         ],
  //       },
  //       {
  //         type: AcceptedTypes.COLUMN,
  //         id: "column1",
  //         children: [
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component2",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: AcceptedTypes.ROW,
  //     id: "row1",
  //     children: [
  //       {
  //         type: AcceptedTypes.COLUMN,
  //         id: "column2",
  //         children: [
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component3",
  //           },
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component0",
  //           },
  //           {
  //             type: AcceptedTypes.COMPONENT,
  //             id: "component2",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  // components: {
  //   component0: { id: "component0", type: ComponentTypes.INPUT, content: "Some input" },
  //   component1: { id: "component1", type: ComponentTypes.IMAGE, content: "Some image" },
  //   component2: { id: "component2", type: ComponentTypes.EMAIL, content: "Some email" },
  //   component3: { id: "component3", type: ComponentTypes.NAME, content: "Some name" },
  //   component4: { id: "component4", type: ComponentTypes.PHONE, content: "Some phone" },
  // },
  layout: [],
  components: {},
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
  const { layout, components } = state;

  const setLayout = useCallback((payload: TLayout[]) => {
    dispatch({ type: "SET_LAYOUT", payload });
  }, []);

  const setComponents = useCallback((payload: TComponents) => {
    dispatch({ type: "SET_COMPONENTS", payload });
  }, []);

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
