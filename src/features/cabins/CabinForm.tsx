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
import { Row } from "@/components/Row";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCabin } from "./useCreateCabin";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2).max(20),
  maxCapacity: z.coerce
    .number({
      required_error: "Maximum capacity is required",
      invalid_type_error: "Maximum capacity must be a number",
    })
    .int()
    .positive()
    .min(1, {
      message: "Capacity must be at least 1",
    }),
  regularPrice: z.coerce.number().positive(),
  discount: z.coerce.number().min(0).max(100),
  description: z.string().max(300),
  image: z
    .instanceof(FileList, { message: "A file is required" })
    .refine((file) => file.length >= 1, "A file is required")
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB"),
});

export const CabinForm = ({ setShowForm }: { setShowForm: () => void }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      maxCapacity: 0,
      regularPrice: 0,
      discount: 0,
      description: "",
      image: null!,
    },
  });

  const { mutate, isCreating } = useCreateCabin(form, setShowForm);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const value = values.image[0];
    mutate({ ...values, image: value });
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
                  disabled={isCreating}
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
                  disabled={isCreating}
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
                  disabled={isCreating}
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
                  disabled={isCreating}
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
                  disabled={isCreating}
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
          <Button type="submit" disabled={isCreating}>
            Submit
          </Button>
          <Button
            variant={"secondary"}
            type="reset"
            onClick={() => setShowForm()}
          >
            Cancel
          </Button>
        </Row>
      </form>
    </Form>
  );
};
