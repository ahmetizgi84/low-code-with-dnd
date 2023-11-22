import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const columnVariants = cva("block p-4 bg-[var(--background)] cursor-move w-full");

export interface ColumnProps extends React.HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof columnVariants> {
  asChild?: boolean;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(columnVariants({ className }))} ref={ref} {...props} />;
});
Column.displayName = "Column";

export { Column };
