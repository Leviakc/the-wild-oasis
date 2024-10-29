import { userQueryOptions } from "@/services/apiAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

import { supabaseUrl } from "@/services/supabase";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { useUpdateUser } from "./useUpdateUser";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/Row";

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(4),
  avatar: z.union([
    z
      .instanceof(FileList, { message: "A file is required" })
      .refine((file) => file.length >= 1, "A file is required")
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
        message: "only .jpg, .jpeg, .png and .webp formats are accepted.",
      })
      .refine((file) => file[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB"),
    z
      .string()
      .refine((file) => file.startsWith(supabaseUrl), "A file is required"),
  ]),
  oldAvatar: z.string(),
  id: z.string(),
});

export const UpdateUserDataForm = () => {
  const { data: user } = useSuspenseQuery(userQueryOptions());
  const navigate = useNavigate();

  const {
    email,
    user_metadata: { fullName, avatar },
    id,
  } = user?.user as User;
  const { updateUser, isUpdating } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName,
      email,
      avatar,
      oldAvatar: avatar as string,
      id,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (fullName === values.fullName && avatar === values.avatar) {
      return;
    }
    updateUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        {/* email  */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="justify-self-center">
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled
                  placeholder="JohnDoe@example.com"
                  {...field}
                  className="disable:text-gray-950 text-gray-950 placeholder:text-gray-950 disabled:bg-gray-300 disabled:opacity-75"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="justify-self-center">
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isUpdating}
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar */}
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem className="justify-self-center">
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  className="m-0 overflow-hidden border-none p-0 file:my-auto file:mt-0 file:rounded-md file:bg-primary file:px-3 file:py-2 file:text-white"
                  type="file"
                  accept="image/*"
                  disabled={isUpdating}
                  placeholder="https://"
                  onChange={(e) => {
                    const file = e.target.files;
                    if (file && file.length > 0) {
                      form.setValue("avatar", file); // Update the image field with the FileList
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Row variant={"horizontal"} className="mt-3 justify-end gap-3">
          <Button
            variant={"secondary"}
            disabled={isUpdating}
            type="reset"
            onClick={() => {
              navigate({ to: "/dashboard", replace: true });
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating}>
            Update account
          </Button>
        </Row>
      </form>
    </Form>
  );
};
