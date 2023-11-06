// export const SIDEBAR_ITEM = "sidebarItem";
// export const ROW = "row";
// export const COLUMN = "column";
// export const COMPONENT = "component";

export enum AcceptedTypes {
  SIDEBAR_ITEM = "sidebarItem",
  ROW = "row",
  COLUMN = "column",
  COMPONENT = "component",
}

export enum ComponentTypes {
  INPUT = "input",
  IMAGE = "image",
  EMAIL = "email",
  NAME = "name",
  PHONE = "phone",
}

// export type TTypes = typeof ROW | typeof COLUMN | typeof COMPONENT | typeof SIDEBAR_ITEM;
// export type ComponentType = "input" | "image" | "email" | "name" | "phone";

export type TLayout = {
  type: AcceptedTypes;
  id: string;
  // children: TLayout[];
  children: any[];
};

export type TComponent = {
  id: string;
  type: ComponentTypes;
  content: string;
};

export type TComponents = {
  [key: string]: TComponent;
};

export interface IDndContextState {
  layout: TLayout[];
  components: TComponents;
}

export interface IDndContextType {
  state: IDndContextState;
  setLayout: (p: TLayout[]) => void;
  setComponents: (params: TComponents) => void;
}

export type TSideBarItem = {
  type: AcceptedTypes;
  id: string;
  component: {
    type: ComponentTypes;
    content: string;
  };
};

export type TGenericComponent = {
  data: TLayout;
  components: TComponents;
  path: string;
};
export interface TRowCol extends TGenericComponent {
  handleDrop: (dropZone: any, item: any) => void;
}
