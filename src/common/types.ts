export interface IDndContextState {
  layout: IComponent[];
  components: IComponent[];
  enableVisualHelper: boolean;
}

export interface IDndContextType {
  state: IDndContextState;
  setLayout: (p: IComponent[]) => void;
  setComponents: (params: IComponent[]) => void;
  addComponent: (item: IComponent, id: string, parent: string) => void;
  removeComponent: (id: string) => void;
  toggleVisualHelper: () => void;
}

// dynamic render interfaces

export type ComponentTypes = "DropZone" | "Button" | "Input" | "Container" | "Row" | "Column";

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
  isDroppable?: boolean;
}

export interface IComponentItems {
  [name: string]: IComponentItem;
}

export const AcceptedComponentList: ComponentTypes[] = ["Button", "Input", "Column", "Container", "Row"];
