import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { VscLoading } from "react-icons/vsc";

import { cn } from "@/lib/utils";

const spinnerVarients = cva("animate-spin rounded-full", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      destructivelite:
        "bg-destructive/10 hover:bg-destructive/5 text-destructive shadow-sm",
    },
    size: {
      default: "h-6 w-6",
      sm: "h-5 w-5",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVarients> {}

const Spinner = React.forwardRef<HTMLOrSVGElement, SpinnerProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <VscLoading
        className={cn(spinnerVarients({ variant, size, className }))}
      />
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVarients };
