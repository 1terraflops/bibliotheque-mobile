import z from "zod";

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

export type ISignUpForm = z.infer<typeof ISignUpFormSchema>;
