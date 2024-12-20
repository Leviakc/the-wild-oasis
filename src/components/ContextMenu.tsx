import { Menus } from "./Menus";
import { Modal } from "./Modal";
import { Pencil, Trash2, Copy } from "lucide-react";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { EditCabinForm } from "@/features/cabins/EditCabinForm";
import type { Cabin } from "@/services/apiCabins";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";

export const ContextMenu = ({ cabin }: { cabin: Cabin }) => {
  const { mutate } = useCreateCabin();
  const { theme } = useThemeToggle();
  const { mutate: deleteCabin, isDeleting } = useDeleteCabin(cabin.name);
  const colorIcon = theme === "dark" ? "#fff" : "#111";

  const { name, image, description, regularPrice, discount, maxCapacity } =
    cabin;

  function handleDuplicate() {
    mutate({
      name: `Copy of ${name}`,
      maxCapacity,
      description,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={cabin.id} />
        <Menus.List id={cabin.id}>
          <Menus.Button
            icon={<Copy color={colorIcon} />}
            onClick={handleDuplicate}
          >
            Duplicate
          </Menus.Button>
          <Modal.Open opens="edit-cabin">
            <Menus.Button icon={<Pencil color={colorIcon} />}>
              Edit
            </Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete-cabin">
            <Menus.Button icon={<Trash2 color={colorIcon} />}>
              Delete
            </Menus.Button>
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
              onCloseModal={close}
              disabled={isDeleting}
              onConfirm={() => {
                deleteCabin(cabin, {
                  onSettled() {
                    close();
                  },
                });
              }}
            />
          )}
        />
      </Menus.Menu>
    </Modal>
  );
};
