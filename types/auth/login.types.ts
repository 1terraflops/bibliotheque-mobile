import z from "zod";

export const ILoginFormSchema = z.object({
  email: z.email("Enter a valid email").trim(),
  password: z.string().trim().min(6, "Password is too short"),
});

export type ILogin = z.infer<typeof ILoginFormSchema>;
