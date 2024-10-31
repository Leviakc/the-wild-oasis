import { ComponentProps } from "react";

type ButtonIconProps = ComponentProps<"button"> & {
  children: React.ReactNode;
  // moveBack: () => void;
};

export const ButtonIcon = ({ children, ...props }: ButtonIconProps) => {
  return (
    <button
      className="h-9 rounded-sm border-none bg-none p-1.5 text-brand-600 hover:bg-gray-300 dark:hover:bg-gray-700 [&_svg]:w-6"
      {...props}
    >
      {children}
    </button>
  );
};
