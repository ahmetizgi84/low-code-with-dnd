import uniqid from "uniqid";
import { AcceptedTypes, ComponentTypes } from "./types";

export const SIDEBAR_ITEMS = [
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.ROW, // sidebarda
      content: "row",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.COLUMN,
      content: "column",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.INPUT,
      content: "input",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.BUTTON, // sidebarda
      content: "button", // editörde
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.AVATAR, // sidebarda
      content: "button", // editörde
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.LABEL, // sidebarda
      content: "label", // editörde
    },
  },
];
