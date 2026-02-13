import z from "zod";

export const ISendMagicLinkFormSchema = z.object({
  email: z.email().trim(),
});

export type ISendMagicLink = z.infer<typeof ISendMagicLinkFormSchema>;
