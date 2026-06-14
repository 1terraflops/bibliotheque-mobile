import z from "zod";

export const IGetBookFormSchema = z.object({
  isbn: z
    .string()
    .trim()
    .refine((val) => val.length === 10 || val.length === 13, {
      message: "ISBN must be 10 or 13 digits long",
    }),
});
export type IGetBook = z.infer<typeof IGetBookFormSchema>;

export const ISearchBookByNameFormSchema = z.object({
  query: z.string().max(100, "Your query is too long"),
});
export type ISearchBookByNameForm = z.infer<typeof ISearchBookByNameFormSchema>;
