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
import { useSignup } from "./useSignup";
import { Row } from "@/components/Row";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";

const formSchema = z
  .object({
    fullName: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    avatar: z
      .instanceof(FileList, { message: "An image is required" })
      .refine((file) => file.length >= 1, "A file is required")
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
        message: "only .jpg, .jpeg, .png and .webp formats are accepted.",
      })
      .refine((file) => file[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB"),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export function SignupForm() {
  const { signup, isPending } = useSignup();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "JohnDoe@example.com",
      password: "pass1234",
      passwordConfirmation: "pass1234",
      avatar: null!,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, fullName, email, avatar } = values;
    signup(
      { password, fullName, email, avatar },
      { onSettled: () => form.reset() },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 grid place-content-center space-y-2"
      >
        {/* Full name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isPending}
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isPending}
                  placeholder="JohnDoe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password (min 8 characters)</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel>Avatar photo</FormLabel>
              <FormControl className="relative inline-block">
                <Input
                  className="m-0 overflow-hidden border-none p-0 file:my-auto file:mt-0 file:rounded-md file:bg-primary file:px-3 file:py-2 file:text-white dark:file:text-black"
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  disabled={isPending}
                  placeholder="https://"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      form.setValue("avatar", files); // Update the image field with the FileList
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Row variant={"horizontal"} className="mt-3 justify-end gap-3">
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
          <Button>Create new user</Button>
        </Row>
      </form>
    </Form>
  );
}
