import uniqid from "uniqid";
import { IComponent } from "./types";

export const createNewLayout = (
  layout: IComponent[],
  droppedItem: IComponent,
  dropZoneId: string
): IComponent[] => {
  console.log("droppedItem: ", droppedItem);
  console.log("dropZoneId: ", dropZoneId);

  let newItem: IComponent;

  if (dropZoneId == "container") {
    const { children } = layout[0];
    newItem = {
      ...droppedItem,
      id: `${droppedItem.type}-${uniqid()}`,
      parent: dropZoneId,
    };
    children.push(newItem);
    return layout;
  }

  const children = findChildrenById(layout, dropZoneId);
  if (children) {
    newItem = {
      ...droppedItem,
      id: `${droppedItem.type}-${uniqid()}`,
      parent: dropZoneId,
    };
    children.push(newItem);
    return layout;
  }

  return layout;
};

const findChildrenById = (
  layout: IComponent[],
  targetId: string
): IComponent[] | undefined => {
  for (const item of layout) {
    if (item.id === targetId) {
      return item.children || [];
    }

    if (item.children) {
      const foundInChildren = findChildrenById(item.children, targetId);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }

  return undefined;
};
