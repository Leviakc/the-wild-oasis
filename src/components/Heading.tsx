import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("leading-normal", {
  variants: {
    variant: {
      h1: "text-3xl font-semibold",
      h2: "text-xl font-semibold",
      h3: "text-xl font-medium",
      h4: "text-2xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export interface HeadingProps
  extends React.HTMLProps<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const elementVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : elementVariant[variant || "h1"];
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
