import { LoaderCircle } from "lucide-react";

export const Loader = ({ size = 80 }) => {
  return (
    <>
      <LoaderCircle
        className="mx-auto my-auto h-full animate-spin text-center text-indigo-500"
        size={size}
      />
    </>
  );
};
