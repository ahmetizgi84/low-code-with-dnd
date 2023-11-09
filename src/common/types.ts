export interface IDndContextState {
  layout: IComponent;
  components: IComponent[];
}

export interface IDndContextType {
  state: IDndContextState;
  setLayout: (p: IComponent) => void;
  setComponents: (params: IComponent[]) => void;
  handleDrop: (item: IComponent, id: string) => void;
}

// dynamic render interfaces

export type ComponentList = "Button" | "Container" | "Row" | "Column" | "DropZone";

export interface IComponent {
  type: ComponentList;
  data: {
    id: string;
    embeddedView?: IComponent;
    children?: IComponent | string;
    items?: Array<IComponent>;
    [key: string]: unknown;
  };
}

export const AcceptedComponentList: ComponentList[] = ["Button", "Column", "Container", "DropZone", "Row"];
