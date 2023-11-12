export interface IDndContextState {
  layout: IComponent[];
  components: IComponent[];
}

export interface IDndContextType {
  state: IDndContextState;
  setLayout: (p: IComponent[]) => void;
  setComponents: (params: IComponent[]) => void;
  handleDrop: (item: IComponent, id: string) => void;
}

// dynamic render interfaces

export type ComponentTypes = "Button" | "Input" | "Container" | "Row" | "Column";

export interface IComponent {
  type: ComponentTypes;
  parent: string;
  id: string;
  children: IComponent[];
  props: {
    [key: string]: unknown;
  };
}

interface IComponentItem {
  component: any;
  isDroppable: boolean;
}

export interface IComponentItems {
  [name: string]: IComponentItem;
}

export const AcceptedComponentList: ComponentTypes[] = ["Button", "Input", "Column", "Container", "Row"];

// New

export interface ComponentItemProps {
  id: string;
  label: string;
  type: ComponentTypes;
  isMoved?: boolean;
  isChild?: boolean;
  isMeta?: boolean;
  soon?: boolean;
  rootParentType?: ComponentTypes;
}
