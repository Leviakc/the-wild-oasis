import { Button } from "@/components/ui/button";
import { Cabin } from "@/services/apiCabins";
import { useDeleteCabin } from "./useDeleteCabin";
import { Modal } from "@/components/Modal";
import { ConfirmDelete } from "@/components/ConfirmDelete";

type DeleteCabinDialogProps = {
  cabin: Cabin;
};

export const DeleteCabinDialog = ({ cabin }: DeleteCabinDialogProps) => {
  const { mutate, isDeleting } = useDeleteCabin(cabin.name);
  return (
    <Modal>
      <Modal.Open opens="delete-cabin">
        <Button variant="destructive">Delete</Button>
      </Modal.Open>
      <Modal.Window
        name="delete-cabin"
        render={(close) => (
          <ConfirmDelete
            resourceName={cabin.name}
            disabled={isDeleting}
            onCloseModal={close}
            onConfirm={() => {
              mutate(cabin);
            }}
          />
        )}
      />
    </Modal>
  );
};
