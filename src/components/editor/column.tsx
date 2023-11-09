import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const columnVariants = cva(
  "block p-4 bg-[var(--background)] cursor-move border relative border-gray-800 one-a-hundred after:content-['Column'] after:bg-gray-800/30 after:absolute after:w-20 after:h-3 after:text-center after:top-0 after:-left-[1px] after:text-white after:text-[8px]"
);

export interface ColumnProps extends React.HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof columnVariants> {
  asChild?: boolean;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(columnVariants({ className }))} ref={ref} {...props} />;
});
Column.displayName = "Column";

export { Column };
