export interface IDndContextState {
  layout: IComponent[];
  components: ComponentTypes[];
}

export interface IDndContextType {
  state: IDndContextState;
  setLayout: (p: IComponent[]) => void;
  setComponents: (params: IComponent[]) => void;
  handleDrop: (item: IComponent, parentType: ComponentTypes, id: string) => void;
}

// dynamic render interfaces

export type ComponentTypes = "Button" | "Container" | "Row" | "Column";

export interface IComponent {
  type: ComponentTypes;
  parent: string;
  id: string;
  children: IComponent[];
  props: {
    [key: string]: unknown;
  };
}

// export interface IComponent {
//   type: ComponentList;
//   data: {
//     id: string;
//     embeddedView?: IComponent;
//     children?: IComponent | string;
//     items?: Array<IComponent>;
//     [key: string]: unknown;
//   };
// }

export const AcceptedComponentList: ComponentTypes[] = ["Button", "Column", "Container", "Row"];
