import { Heading } from "./Heading";
import { Button } from "./ui/button";

type ConfirmDeleteProps = {
  onCloseModal: () => void;
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
};

export const ConfirmDelete = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) => {
  return (
    <div className="flex w-96 flex-col gap-3">
      <Heading variant={"h3"}>Delete</Heading>
      <p className="mb-3 text-gray-500">
        Are you sure you want to delete{" "}
        <span className="font-bold text-gray-800 dark:text-gray-200">
          {resourceName}
        </span>{" "}
        permanently? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => onCloseModal()}
          variant="secondary"
          disabled={disabled}
          className="dark:bg-gray-900 dark:hover:bg-gray-950"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm()}
          variant="destructive"
          disabled={disabled}
          className="dark:bg-red-600 dark:hover:bg-red-800"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
