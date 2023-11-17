import * as React from "react";
import classnames from "classnames";
import type { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { useDropComponent } from "@/hooks/useDropComponent";

const dropZoneVariants = cva("transition-all");

export interface DropZoneProps extends React.HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof dropZoneVariants> {
  id: string;
  className: string;
  parent: string;
}

const DropZone: FC<DropZoneProps> = ({ className, id, parent, ...rest }) => {
  const { drop, isActive } = useDropComponent(id, parent);
  return (
    <div
      className={classnames(cn(dropZoneVariants({ className })), { active: isActive })}
      ref={drop}
      id={id}
      {...rest}
    />
  );
};

export { DropZone };
