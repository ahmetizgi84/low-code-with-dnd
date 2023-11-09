import uniqid from "uniqid";
import { IComponent } from "./types";

export const handleMoveSidebarComponentIntoLayout = (layout: IComponent, newItem: IComponent, dropZoneId: string) => {
  const { data, type } = layout;
  const { items } = data;

  let newLayoutStructure: IComponent;

  if (type == "Container" && items?.length == 1 && newItem.type == "Column") {
    newLayoutStructure = {
      type,
      data: {
        id: data.id,
        items: [
          {
            type: "DropZone",
            data: {
              id: `dropZone-${uniqid()}`,
            },
          },
          newItem,
          {
            type: "DropZone",
            data: {
              id: `dropZone-${uniqid()}`,
            },
          },
        ],
      },
    };

    return newLayoutStructure;
  }

  console.log("dropZoneId: ", dropZoneId);
  console.log("layout: ", layout);
  console.log("newItem: ", newItem);
  console.log("items: ", items);

  return layout;
};
