import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Cabin } from "@/services/apiCabins";
import { Row } from "@/components/Row";
import { Textarea } from "@/components/ui/textarea";
import { useEditCabin } from "./useEditCabin";
import { editFormSchema } from "@/schemas/editCabinSchema";

interface EditCabinFormProps {
  cabin: Cabin;
  onCloseModal: () => void;
}

export const EditCabinForm = ({ cabin, onCloseModal }: EditCabinFormProps) => {
  const { name, maxCapacity, regularPrice, description, discount, image } =
    cabin;

  const { mutate, isUpdating } = useEditCabin({ onCloseModal, name });

  // 1. Define your form.
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
      oldImage: image as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof editFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // const value = values.image[0];
    // mutate({ ...values, image: value });
    mutate({ ...cabin, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isUpdating}
                  placeholder="chapulines"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Maximum capacity */}
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isUpdating}
                  placeholder="5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Regular price */}
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isUpdating}
                  placeholder="100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description for website</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isUpdating}
                  className=""
                  placeholder="A beautiful house..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Cabin photo</FormLabel>
              <FormControl className="relative inline-block">
                <Input
                  className="m-0 overflow-hidden border-none p-0 file:my-auto file:mt-0 file:rounded-md file:bg-primary file:px-3 file:py-2 file:text-white"
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  disabled={isUpdating}
                  placeholder="https://"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      form.setValue("image", files); // Update the image field with the FileList
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Row>
          <Button type="submit" disabled={isUpdating}>
            Submit
          </Button>
          <Button
            variant={"secondary"}
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
        </Row>
      </form>
    </Form>
  );
};
