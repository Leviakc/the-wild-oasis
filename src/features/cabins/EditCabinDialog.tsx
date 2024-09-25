import { Button } from "@/components/ui/button";
import { EditCabinForm } from "./EditCabinForm";
import type { Cabin } from "@/services/apiCabins";
import { Modal } from "@/components/Modal";

type EditCabinDialoProps = {
  cabin: Cabin;
};

export const EditCabinDialog = ({ cabin }: EditCabinDialoProps) => {
  return (
    <Modal>
      <Modal.Open opens="edit-cabin">
        <Button>Edit</Button>
      </Modal.Open>
      <Modal.Window
        name="edit-cabin"
        render={(close) => <EditCabinForm cabin={cabin} onCloseModal={close} />}
      />
    </Modal>
  );
};
