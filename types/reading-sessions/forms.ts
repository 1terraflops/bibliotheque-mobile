import z from "zod";

export const IEnterNumberOfPagesFormSchema = z.object({
  actualPageCount: z.number().positive().max(10000),
});
export type IEnterNumberOfPagesForm = z.infer<
  typeof IEnterNumberOfPagesFormSchema
>;

export const IEndSessionFormSchema = z
  .object({
    startPage: z.number().positive({ error: "Invalid Page" }),
    endPage: z.number().positive({ error: "Invalid Page" }),
    startedAt: z.string(),
    finishedAt: z.string(),
  })
  .refine((data) => data.endPage > data.startPage, {
    message: "End page must be bigger than start page",
    path: ["endPage"],
  })
  .refine((data) => new Date(data.finishedAt) > new Date(data.startedAt), {
    message: "You cannot end sooner than session start time",
    path: ["endedAt"],
  });
export type IEndSessionForm = z.infer<typeof IEndSessionFormSchema>;
