import z from "zod";

export const IResetPasswordFormSchema = z
  .object({
    new_password: z.string().trim().min(6, "Password is too short"),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type IResetPasswordForm = z.infer<typeof IResetPasswordFormSchema>;
