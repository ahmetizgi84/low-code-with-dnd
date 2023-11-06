import uniqid from "uniqid";
import { AcceptedTypes, ComponentTypes } from "./types";

export const SIDEBAR_ITEMS = [
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.INPUT,
      content: "Some input",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.NAME,
      content: "Some name",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.EMAIL,
      content: "Some email",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.PHONE,
      content: "Some phone",
    },
  },
  {
    id: uniqid(),
    type: AcceptedTypes.SIDEBAR_ITEM,
    component: {
      type: ComponentTypes.IMAGE,
      content: "Some image",
    },
  },
];
