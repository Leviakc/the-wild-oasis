import { Cabin } from "@/services/apiCabins";
import { Heading } from "./Heading";
import { Button } from "./ui/button";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";

type ConfirmDeleteProps = {
  onClose: () => void;
  cabin: Cabin;
};

export const ConfirmDelete = ({ onClose, cabin }: ConfirmDeleteProps) => {
  const { mutate: deleteCabin, isDeleting } = useDeleteCabin(
    cabin.name,
    onClose,
  );

  return (
    <div className="flex w-96 flex-col gap-3">
      <Heading variant={"h3"}>Delete</Heading>
      <p className="mb-3 text-gray-500">
        Are you sure you want to delete{" "}
        <span className="font-bold text-gray-800">{cabin.name}</span>{" "}
        permanently? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => onClose()}
          variant="secondary"
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={() => deleteCabin(cabin)}
          variant="destructive"
          disabled={isDeleting}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
