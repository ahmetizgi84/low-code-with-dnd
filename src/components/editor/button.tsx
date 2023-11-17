import { Button as ShadcnButton } from "@/components/ui/button";
import React from "react";

type TSize = "default" | "sm" | "lg" | "icon" | null | undefined;
type TVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;

interface IButton {
  size: TSize;
  variant: TVariant;
  className: string;
  title: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ size = "default", variant = "default", className, title = "Default Title", ...rest }, ref) => {
    return (
      <ShadcnButton size={size} variant={variant} className={className} ref={ref} {...rest}>
        {title}
      </ShadcnButton>
    );
  }
);

export { Button };
