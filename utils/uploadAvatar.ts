import { supabase } from "@/api/supabase";

const uploadAvatar = async (id: string, uri: string) => {
  const fileExt = uri.split(".").pop();
  const fileName = `${id}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const formData = new FormData();
  formData.append("file", {
    uri: uri,
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

  console.log("Public URL:", publicUrl);
  return publicUrl;
};

export default uploadAvatar;
