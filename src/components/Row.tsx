import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rowVariants = cva("flex", {
  variants: {
    variant: {
      horizontal: "justify-between items-center",
      vertical: "flex-col gap-4",
    },
  },
  defaultVariants: {
    variant: "vertical",
  },
});

export interface RowProps
  extends React.HTMLProps<HTMLDivElement>,
    VariantProps<typeof rowVariants> {
  asChild?: boolean;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(rowVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Row.displayName = "Row";

export { Row, rowVariants };
