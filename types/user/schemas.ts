import z from "zod";

export const IUpdateProfileValidator = z.object({
  avatar_url: z.string().nullable(),
  full_name: z
    .string()
    .trim()
    .min(6, "Too short")
    .max(20, "Too long")
    .nullable(),
  bio: z.string().max(100, "Bio is too long").nullable(),
  username: z
    .string()
    .trim()
    .min(6, "Too short")
    .max(20, "Too long")
    .nullable(),
});
