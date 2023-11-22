import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";

const containerVariants = cva("bg-[var(--background)]");

export interface ContainerProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} {...props} />;
  // return <Comp className={cn(containerVariants({ className }))} ref={ref} {...props} />;
});
Container.displayName = "Container";

export { Container };
