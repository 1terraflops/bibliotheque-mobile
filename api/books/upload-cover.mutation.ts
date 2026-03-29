import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";
import { queryClient } from "../queryClient";
import { getBooksByStatusesQueryOptions } from "./get-books-by-statuses.query";
import { getUserBookQueryOptions } from "./get-user-book.query";

type UploadCoverRequestDto = {
  isbn: string;
  id: number;
  imageUri: string;
};

export const uploadCoverMutationOptions = () =>
  mutationOptions({
    mutationFn: async ({ id, imageUri }: UploadCoverRequestDto) => {
      const formData = new FormData();

      formData.append("file", {
        uri: imageUri,
        name: "cover.jpg",
        type: "image/jpeg",
      } as any);

      return await api.patch(`books/cover/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: getBooksByStatusesQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getUserBookQueryOptions({ isbn: ctx.isbn }).queryKey,
      });
    },
  });
