import { ComponentProps } from "react";

type ButtonIconProps = ComponentProps<"button"> & {
  children: React.ReactNode;
  // moveBack: () => void;
};

export const ButtonIcon = ({ children, ...props }: ButtonIconProps) => {
  return (
    <button
      className="h-6 rounded-sm border-none bg-none p-1.5 text-brand-600 transition-all delay-200 hover:bg-gray-100 [&>svg]:w-6"
      {...props}
    >
      {children}
    </button>
  );
};
