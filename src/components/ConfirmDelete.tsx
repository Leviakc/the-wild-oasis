import { Heading } from "./Heading";
import { Button } from "./ui/button";

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  onClose: () => void;
  disabled: boolean;
};

export const ConfirmDelete = ({
  resourceName,
  onConfirm,
  disabled,
  onClose,
}: ConfirmDeleteProps) => {
  return (
    <div className="flex w-96 flex-col gap-3">
      <Heading variant={"h3"}>Delete</Heading>
      <p className="mb-3 text-gray-500">
        Are you sure you want to delete{" "}
        <span className="font-bold text-gray-800">{resourceName}</span>{" "}
        permanently? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => onClose()}
          variant="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm()}
          variant="destructive"
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
