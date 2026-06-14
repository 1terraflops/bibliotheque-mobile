import z from "zod";

export const IAddReviewFormSchema = z.object({
  review: z
    .string()
    .min(1, "The review is too short")
    .max(2000, "The review is too long"),
  hasSpoilers: z.boolean(),
});
export type IAddReviewForm = z.infer<typeof IAddReviewFormSchema>;
