import { supabaseUrl } from "@/services/supabase";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

export const editFormSchema = z.object({
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
  description: z.string().max(500),
  image: z.union([
    z
      .instanceof(FileList, { message: "A file is required" })
      .refine((file) => file.length >= 1, "A file is required")
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
        message: "only .jpg, .jpeg, .png and .webp formats are accepted.",
      })
      .refine((file) => file[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB"),
    z.string().refine((file) => file.startsWith(supabaseUrl)),
  ]),
  oldImage: z.string(),
});
