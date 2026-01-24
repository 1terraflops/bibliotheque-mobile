import z from "zod";

export const ISignUpFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z.string().trim().min(6, "Password is too short"),
});

export type ISignUpForm = z.infer<typeof ISignUpFormSchema>;
