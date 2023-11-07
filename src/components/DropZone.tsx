import type { FC } from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { AcceptedTypes, TComponent } from "@/common/types";

const ACCEPTS = [
  AcceptedTypes.SIDEBAR_ITEM,
  AcceptedTypes.COMPONENT,
  AcceptedTypes.ROW,
  AcceptedTypes.COLUMN,
  AcceptedTypes.BUTTON,
];

type TData = {
  path: string;
  childrenCount: number;
};

type TDropZone = {
  data: TData;
  onDrop: (data: TData, item: TComponent) => void;
  className?: string;
};

const DropZone: FC<TDropZone> = ({ data, onDrop, className }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    // Required. A string, a symbol, or an array of either.
    // This drop target will only react to the items produced by the drag sources of the specified type or types.
    accept: ACCEPTS,

    // Optional. Called when a compatible item is dropped on the target.
    drop: (item: TComponent) => {
      onDrop(data, item);
    },

    // Optional. Use it to specify whether the drop target is able to accept the item.
    canDrop: (item: any, _) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath.split("-");
      const itemPath = item.path;

      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        // if (data.childrenCount >= 3) {
        //  return false;
        // }
        return true;
      }

      const splitItemPath = itemPath.split("-");

      // limit columns when dragging from one row to another row
      const dropZonePathRowIndex = splitDropZonePath[0];
      const itemPathRowIndex = splitItemPath[0];
      const diffRow = dropZonePathRowIndex !== itemPathRowIndex;
      if (diffRow && splitDropZonePath.length === 2 && data.childrenCount >= 3) {
        return false;
      }

      // Invalid (Can't drop a parent element (row) into a child (column))
      const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
      if (parentDropInChild) return false;

      // Current item can't possible move to it's own location
      if (itemPath === dropZonePath) return false;

      // Current area
      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join("-");
        const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

        const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
        const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return false;
        }
      }

      return true;
    },

    // Optional. The collecting function. It should return a plain object of the props to return for injection into your component.
    // It receives two parameters, monitor and props.
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return <div className={classNames("h-10 transition-all", { active: isActive }, className)} ref={drop} />;
};
export default DropZone;
