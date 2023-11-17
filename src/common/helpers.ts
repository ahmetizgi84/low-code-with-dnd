import uniqid from "uniqid";

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
  layout: IComponent[],
  targetId: string,
  componentId: string,
  dropzoneId: string
): IComponent[] {
  let newLayoutStructure: IComponent[] = [...layout];
  // const targetObject = findObjectById(newLayoutStructure, targetId);
  // const movedObject = findObjectById(newLayoutStructure, componentId);

  const { updatedLayout, removedObject } = removeObjectById(newLayoutStructure, componentId);
  if (removedObject) {
    // const updatedLayoutWithChild = addChildToParentById(updatedLayout, targetId, removedObject);
    const dropzoneIndex = parseInt(dropzoneId.split("-")[1]);
    const updatedLayoutWithChild = addChildToParentAtIndex(updatedLayout, targetId, removedObject, dropzoneIndex);
    if (updatedLayoutWithChild) {
      // console.log("Çocuk eklenmiş güncellenmiş layout dizisi:", updatedLayoutWithChild);
    } else {
      console.log("Belirtilen ID ile eşleşen parent obje bulunamadı.");
    }
  } else {
    console.log("Belirtilen ID ile eşleşen obje bulunamadı.");
  }

  return newLayoutStructure;
}

function findObjectById(layout: IComponent[], id: string): IComponent | null {
  for (const obj of layout) {
    if (obj.id === id) {
      return obj;
    } else if (obj.children && obj.children.length > 0) {
      const nestedObject: IComponent | null = findObjectById(obj.children, id);
      if (nestedObject) {
        return nestedObject;
      }
    }
  }

  return null;
}

type TRemoveObjectById = {
  updatedLayout: IComponent[];
  removedObject: IComponent | null;
};

function removeObjectById(layout: IComponent[], id: string): TRemoveObjectById {
  for (let i = 0; i < layout.length; i++) {
    if (layout[i].id === id) {
      const removedObject = layout.splice(i, 1)[0];
      return { updatedLayout: layout, removedObject };
    } else if (layout[i].children && layout[i].children.length > 0) {
      const { removedObject } = removeObjectById(layout[i].children, id);
      if (removedObject) {
        return { updatedLayout: layout, removedObject };
      }
    }
  }

  return { updatedLayout: layout, removedObject: null };
}

function addChildToParentById(layout: IComponent[], parentId: string, child: IComponent): IComponent[] | null {
  const parentObject = findObjectById(layout, parentId);

  if (parentObject) {
    console.log("length: ", parentObject?.children.length);
    parentObject.children.push(child);
    return layout;
  }

  return null;
}

function addChildToParentAtIndex(
  layout: IComponent[],
  parentId: string,
  child: IComponent,
  index: number
): IComponent[] | null {
  const parentObject = findObjectById(layout, parentId);

  if (parentObject) {
    child.parent = parentId;
    parentObject.children.splice(index, 0, child);

    // Kaydırma işlemi
    for (let i = index + 1; i < parentObject.children.length; i++) {
      const currentIndex = parseInt(parentObject.children[i].id.split("-")[1]);
      parentObject.children[i].id = `Column-${currentIndex + 1}`;
    }

    return layout;
  }

  return null;
}
