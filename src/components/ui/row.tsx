import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rowVariants = cva(
  "__ROW__ px-2 py-2 bg-[var(--background)] cursor-move border border-gray-800 relative after:content-['Row'] after:bg-gray-800 after:absolute after:w-20 after:h-5 after:text-center after:-top-5 after:-left-[1px] after:text-white after:text-sm"
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
