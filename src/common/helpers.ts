import uniqid from "uniqid";
import _ from "lodash";

import { IComponent } from "./types";

export function generateLayoutWithDropzones(arr: IComponent[], parentId: string) {
  if (!arr || arr.length === 0) {
    arr = [
      {
        type: "DropZone",
        parent: parentId,
        id: `dropzone-0-${uniqid()}`,
        children: [],
        props: {
          parent: parentId,
          id: `dropzone-${0}-${uniqid()}`,
          className: "w-full h-10",
        },
      },
    ];
  } else {
    const parentType = parentId.split("-").slice(0)[0];
    const dropzones: IComponent[] = Array.from({ length: arr.length + 1 }, (_, index) => ({
      type: "DropZone",
      parent: parentId,
      id: `dropzone-${index}-${uniqid()}`,
      children: [],
      props: {
        parent: parentId,
        id: `dropzone-${index}-${uniqid()}`,
        className: parentType == "Row" ? "w-10 h-auto" : "w-full h-10",
      },
    }));

    const newChildren = dropzones.reduce((acc: IComponent[], dropzone: IComponent, index: number) => {
      if (index < arr.length) {
        acc.push(dropzone, arr[index]);
      } else {
        acc.push(dropzone);
      }
      return acc;
    }, []);

    arr = newChildren;
  }

  return arr;
}

export function updateLayout(
  state: IComponent[],
  targetId: string,
  component: IComponent,
  dropzoneId: string
): IComponent[] {
  const dropzoneIndex = parseInt(dropzoneId.split("-")[1]);
  return addChildToParentAtIndex(state, targetId, component, dropzoneIndex);
}

export function removeObjectById(array: IComponent[], id: string): IComponent[] {
  _.forEach(array, (item, index) => {
    if (item && item.id === id) {
      array.splice(index, 1);
    } else if (item && _.isArray(item.children)) {
      removeObjectById(item.children, id);
    }
  });
  return array;
}

function addChildToParentAtIndex(
  layout: IComponent[],
  parentId: string,
  child: IComponent,
  index: number
): IComponent[] {
  const parentObject = findObjectById(layout, parentId);

  if (parentObject) {
    child.parent = parentObject.id;
    parentObject.children.splice(index, 0, child);

    return layout;
  }

  return layout;
}

function findObjectById(array: IComponent[], id: string): IComponent | null {
  let result = null;

  _.forEach(array, (item) => {
    if (item && item.id === id) {
      result = item;
      return false; // break the loop
    } else if (item && _.isArray(item.children)) {
      result = findObjectById(item.children, id);
      if (result) {
        return false; // break the loop
      }
    }
  });

  return result;
}
