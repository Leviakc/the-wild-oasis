import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUser } from "./useUpdateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";

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

const updatePasswordFormSchema = z
  .object({
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
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

export const UpdatePasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });
  function onSubmit(values: z.infer<typeof updatePasswordFormSchema>) {
    const { password } = values;
    updateUser({ password }, { onSuccess: () => form.reset() });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        {/* password  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="justify-self-center">
              <FormLabel>New password (min 8 chars)</FormLabel>
              <FormControl>
                <Input type="password" disabled={isUpdating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email  */}
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem className="justify-self-center">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isUpdating} {...field} />
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
