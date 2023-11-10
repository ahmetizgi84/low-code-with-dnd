import { Button as ShadcnButton } from "@/components/ui/button";

type TSize = "default" | "sm" | "lg" | "icon" | null | undefined;
type TVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;

interface IButton {
  size: TSize;
  variant: TVariant;
  className: string;
  title: string;
}

function Button({ size = "default", variant = "default", className, title = "Default Title", ...rest }: IButton) {
  return (
    <ShadcnButton size={size} variant={variant} className={className} {...rest}>
      {title}
    </ShadcnButton>
  );
}

export { Button };
