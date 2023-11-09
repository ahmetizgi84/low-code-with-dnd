import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rowVariants = cva(
  "flex p-4 bg-[var(--background)] cursor-move border border-gray-800 relative after:content-['Row'] after:bg-gray-800/30 after:absolute after:w-20 after:h-3 after:text-center after:-top-0 after:-left-[1px] after:text-white after:text-[8px]"
);

export interface RowProps extends React.HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof rowVariants> {
  asChild?: boolean;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(rowVariants({ className }))} ref={ref} {...props} />;
});
Row.displayName = "Row";

export { Row };
