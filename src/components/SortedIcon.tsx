import { SortDirection } from "@tanstack/react-table";

import { ArrowUpDown, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export const SortedIcon = ({
  isSorted,
}: {
  isSorted: false | SortDirection;
}) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }

  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return <ArrowUpDown className="ml-1 h-4 w-4" />;
};
