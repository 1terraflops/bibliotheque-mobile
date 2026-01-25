import z from "zod";

export const IForgotPasswordFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
});

export type IForgotPasswordForm = z.infer<typeof IForgotPasswordFormSchema>;
