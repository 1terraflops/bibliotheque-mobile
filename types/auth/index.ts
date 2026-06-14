import z from "zod";

export const ILoginFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z.string().trim().min(6, "Password is too short"),
});
export type ILogin = z.infer<typeof ILoginFormSchema>;

export const ISignUpFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z
    .string()
    .trim()
    .refine(
      (val) => val.length === 0 || val.length >= 6,
      "Password is too short",
    ),
});
export type ISignUp = z.infer<typeof ISignUpFormSchema>;

export const IResetPasswordFormSchema = z
  .object({
    new_password: z.string().trim().min(6, "Password is too short"),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
export type IResetPassword = z.infer<typeof IResetPasswordFormSchema>;

export const ISendMagicLinkFormSchema = z.object({
  email: z.email().trim(),
});
export type ISendMagicLink = z.infer<typeof ISendMagicLinkFormSchema>;

export const IForgotPasswordFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
});
export type IForgotPassword = z.infer<typeof IForgotPasswordFormSchema>;
