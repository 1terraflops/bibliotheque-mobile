import { mutationOptions } from "@tanstack/react-query";
import { supabase } from "../supabase";

type UploadAvatarRequestDto = {
  id: string;
  imageUri: string;
};

export const uploadAvatarMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: UploadAvatarRequestDto) => {
      const { id, imageUri } = params;

      const fileExt = imageUri.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: `image/${fileExt}`,
        name: fileName,
      } as any);

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, formData, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      return publicUrl;
    },
  });
