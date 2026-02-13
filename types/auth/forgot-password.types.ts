import z from "zod";

export const IForgotPasswordFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
});

export type IForgotPassword = z.infer<typeof IForgotPasswordFormSchema>;
