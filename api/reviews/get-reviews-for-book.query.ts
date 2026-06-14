import { ReviewSchema } from "@/types/books";
import { parseResponse } from "@/utils/parseResponse";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { api } from "../axios";

const BookReviewSchema = z.array(ReviewSchema);

export const getReviewsForBookQueryOptions = (isbn: string) =>
  queryOptions({
    queryKey: ["review-for-book", isbn],
    queryFn: async ({ signal }) =>
      await api
        .get(`books/book-reviews/${isbn}`, { signal })
        .then(parseResponse(BookReviewSchema)),
    enabled: !!isbn.length,
  });
