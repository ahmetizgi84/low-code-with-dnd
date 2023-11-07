export enum AcceptedTypes {
  SIDEBAR_ITEM = "sidebarItem",
  ROW = "row",
  COLUMN = "column",
  COMPONENT = "component",
  INPUT = "input",
  BUTTON = "button",
  AVATAR = "avatar",
  LABEL = "label",
}

export enum ComponentTypes {
  ROW = "row",
  COLUMN = "column",
  INPUT = "input",
  BUTTON = "button",
  AVATAR = "avatar",
  LABEL = "label",
}

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
  children: string[];
  parent: string;
  props: any;
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
  handleDrop: (dropZone: any, item: any) => void;
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
