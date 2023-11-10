// import { Button, Card, Container, Divider, Input } from "@chakra-ui/react";
import { Button } from "@/components/editor/button";
import { Container } from "@/components/editor/container";
import { Row } from "@/components/editor/row";
import { Column } from "@/components/editor/column";
import { IComponentItems } from "./types";
import { Input } from "@/components/ui/input";

export const Components: IComponentItems = {
  Container: {
    component: Container,
    isDroppable: true,
  },
  Row: {
    component: Row,
    isDroppable: true,
  },
  Column: {
    component: Column,
    isDroppable: true,
  },
  Button: {
    component: Button,
    isDroppable: false,
  },
  Input: {
    component: Input,
    isDroppable: false,
  },
  div: {
    component: "div",
    isDroppable: true,
  },
};
