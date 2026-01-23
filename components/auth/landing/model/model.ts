import z from "zod";

export const ILandingFormSchema = z.object({
  email: z.email().trim(),
});

export type ILandingForm = z.infer<typeof ILandingFormSchema>;
