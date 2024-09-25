import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

type Form = UseFormReturn<
  {
    name: string;
    image: FileList;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
  },
  any,
  undefined
>;

interface InputFieldProps {
  form: Form;
  children: React.ReactNode;
  name:
    | "name"
    | "image"
    | "maxCapacity"
    | "regularPrice"
    | "discount"
    | "description";
}

export const InputField = ({ form, name, children }: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={(form) => (
        <FormItem>
          <FormLabel>Cabin name</FormLabel>
          <FormControl>{children}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
