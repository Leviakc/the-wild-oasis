import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { CabinForm } from "@/features/cabins/CabinForm";

// AddCabin Compound component
export const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button className="ml-auto w-fit">Add new cabin</Button>
      </Modal.Open>
      <Modal.Window
        name="cabin-form"
        render={(close) => <CabinForm setShowForm={close} />}
      ></Modal.Window>
      {/* <Modal.Open opens="table"> */}
      {/*   <Button>Show table</Button> */}
      {/* </Modal.Open> */}
      {/* <Modal.Window name="table" render={() => <CabinTable />}></Modal.Window> */}
    </Modal>
  );
};

// Old AddCabin component
// export const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <div>AddCabin</div>
//
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {/* {isOpenModal && <CabinForm setShowForm={setIsOpenModal} />} */}
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CabinForm setShowForm={setIsOpenModal} />
//         </Modal>
//       )}
//     </>
//   );
// };
