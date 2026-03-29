import { mutationOptions } from "@tanstack/react-query";
import { api } from "../axios";

type UploadCoverRequestDto = {
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
  });
