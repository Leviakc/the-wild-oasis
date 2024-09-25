import { type Cabin } from "@/services/apiCabins";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { ContextMenu } from "@/components/ContextMenu";

interface CabinRowProps {
  cabin: Cabin;
}

export const CabinRow = ({ cabin }: CabinRowProps) => {
  const { mutate } = useCreateCabin();

  const {
    id: cabinId,
    name,
    image,
    description,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin;

  const handleDuplicate = () => {
    mutate({
      name: `Copy of ${name}`,
      maxCapacity,
      description,
      regularPrice,
      discount,
      image,
    });
  };

  return (
    <>
      <TableRow key={cabinId}>
        <TableCell className="font-medium">
          <img src={image} alt="Logo" className="h-20 w-auto" />
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell>
          <p>Fits up to {maxCapacity} guests</p>
        </TableCell>
        <TableCell>{formatCurrency(regularPrice)}</TableCell>
        <TableCell className="text-green-700">
          {formatCurrency(discount)}
        </TableCell>
        <TableCell className="">
          <ContextMenu cabin={cabin} handleDuplicate={handleDuplicate} />
        </TableCell>
      </TableRow>
    </>
  );
};
