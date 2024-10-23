import { ComponentProps } from "react";

type FlagProps = ComponentProps<"img">;

export const Flag = ({ ...props }: FlagProps) => {
  return (
    <img
      className="block max-w-7 rounded-sm border border-solid border-gray-100"
      {...props}
    />
  );
};
