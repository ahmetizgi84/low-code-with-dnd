import uniqid from "uniqid";
import { AcceptedTypes, TLayout } from "./types";

export const handleMoveSidebarComponentIntoParent = (
  layout: TLayout[],
  splitDropZonePath: string,
  //   item: TSideBarItem
  item: any
) => {
  let newLayoutStructure: TLayout;

  switch (splitDropZonePath.length) {
    case 1: {
      newLayoutStructure = {
        type: AcceptedTypes.ROW,
        id: uniqid(),
        children: [{ type: AcceptedTypes.COLUMN, id: uniqid(), children: [item] }],
      };
      break;
    }

    case 2: {
      newLayoutStructure = {
        type: AcceptedTypes.COLUMN,
        id: uniqid(),
        children: [item],
      };
      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
};

export const addChildToChildren = (children: TLayout[], splitDropZonePath: string, item: TLayout) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    return insert(children, dropZoneIndex, item);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: addChildToChildren(nodeChildren.children, splitItemChildrenPath, item),
  };

  return updatedChildren;
};

export const insert = (arr: TLayout[], index: number, newItem: TLayout) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

////////////////

export const handleMoveWithinParent = (layout: TLayout[], splitDropZonePath: string, splitItemPath: string) => {
  return reorderChildren(layout, splitDropZonePath, splitItemPath);
};

export const reorderChildren = (children: TLayout[], splitDropZonePath: string, splitItemPath: string): TLayout[] => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    return reorder(children, itemIndex, dropZoneIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: reorderChildren(nodeChildren.children, splitDropZoneChildrenPath, splitItemChildrenPath),
  };

  return updatedChildren;
};

export const reorder = (list: TLayout[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

//////////////////////////////////////////////////

export const handleMoveToDifferentParent = (
  layout: TLayout[],
  splitDropZonePath: string,
  splitItemPath: string,
  item: any
): TLayout[] => {
  let newLayoutStructure;
  const COLUMN_STRUCTURE = {
    type: AcceptedTypes.COLUMN,
    id: uniqid(),
    children: [item],
  };

  const ROW_STRUCTURE = {
    type: AcceptedTypes.ROW,
    id: uniqid(),
  };

  switch (splitDropZonePath.length) {
    case 1: {
      // moving column outside into new row made on the fly
      if (item.type === AcceptedTypes.COLUMN) {
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [item],
        };
      } else {
        // moving component outside into new row made on the fly
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [COLUMN_STRUCTURE],
        };
      }
      break;
    }
    case 2: {
      // moving component outside into a row which creates column
      if (item.type === AcceptedTypes.COMPONENT) {
        newLayoutStructure = COLUMN_STRUCTURE;
      } else {
        // moving column into existing row
        newLayoutStructure = item;
      }

      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  let updatedLayout = layout;
  updatedLayout = removeChildFromChildren(updatedLayout, splitItemPath);
  updatedLayout = handleAddColumDataToRow(updatedLayout);
  updatedLayout = addChildToChildren(updatedLayout, splitDropZonePath, newLayoutStructure);

  return updatedLayout;
};

export const removeChildFromChildren = (children: TLayout[], splitItemPath: string) => {
  if (splitItemPath.length === 1) {
    const itemIndex = Number(splitItemPath[0]);
    return remove(children, itemIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitItemPath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: removeChildFromChildren(nodeChildren.children, splitItemChildrenPath),
  };

  return updatedChildren;
};

export const handleAddColumDataToRow = (layout: TLayout[]) => {
  const layoutCopy = [...layout];
  const COLUMN_STRUCTURE = {
    type: AcceptedTypes.COLUMN,
    id: uniqid(),
    children: [],
  };

  return layoutCopy.map((row) => {
    if (!row.children.length) {
      row.children = [COLUMN_STRUCTURE];
    }
    return row;
  });
};

export const remove = (arr: TLayout[], index: number) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1),
];
