import { IComponent } from "./types";

export const findParentById = (layout: IComponent[], targetId: string): string | null => {
  for (const child of layout) {
    const { parent, id, children } = child;
    if (id == targetId) return parent;
    return findParentById(children, targetId);
  }
  return null;
};

export const findParentObjectById = (layout: IComponent[], targetId: string): IComponent => {
  for (const child of layout) {
    const { id, children } = child;
    if (id == targetId) return child;
    return findParentObjectById(children, targetId);
  }

  return {
    type: "Container",
    id: "dummy-container",
    parent: "dummy-root",
    props: {},
    children: [],
  };
};
