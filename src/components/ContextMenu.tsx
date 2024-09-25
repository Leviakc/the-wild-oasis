import { Menus } from "./Menus";
import { Modal } from "./Modal";
import { Pencil, Trash2, Copy } from "lucide-react";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { EditCabinForm } from "@/features/cabins/EditCabinForm";
import type { Cabin } from "@/services/apiCabins";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";

export const ContextMenu = ({
  cabin,
  handleDuplicate,
}: {
  cabin: Cabin;
  handleDuplicate?: () => void;
}) => {
  const { mutate: deleteCabin, isDeleting } = useDeleteCabin(cabin.name);

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={cabin.id} />
        <Menus.List id={cabin.id}>
          <Menus.Button icon={<Copy color="#111" />} onClick={handleDuplicate}>
            Duplicate
          </Menus.Button>
          <Modal.Open opens="edit-cabin">
            <Menus.Button icon={<Pencil color="#111" />}>Edit</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete-cabin">
            <Menus.Button icon={<Trash2 color="#111" />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        {/* Edit Cabin */}
        <Modal.Window
          name="edit-cabin"
          render={(close) => (
            <EditCabinForm cabin={cabin} onCloseModal={close} />
          )}
        />

        {/* Delete Cabin */}
        <Modal.Window
          name="delete-cabin"
          render={(close) => (
            <ConfirmDelete
              resourceName={cabin.name}
              disabled={isDeleting}
              onClose={close}
              onConfirm={() => {
                deleteCabin(cabin);
              }}
            />
          )}
        />
      </Menus.Menu>
    </Modal>
  );
};
