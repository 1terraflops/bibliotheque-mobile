import { queryClient } from "@/api/queryClient";
import { supabase } from "@/api/supabase";
import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import {
  Avatar,
  Button,
  Input,
  ScreenLayout,
  Typography,
} from "@/components/shared";
import { useSessionStore } from "@/store/session.store";
import { IUpdateProfile, IUpdateProfileValidator } from "@/types/user";
import uploadAvatar from "@/utils/uploadAvatar";
import { useForm } from "@tanstack/react-form";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();
  const user = useSessionStore().user;

  const form = useForm({
    defaultValues: {
      avatar_url: user?.avatar_url,
      full_name: user?.full_name,
      bio: user?.bio,
    } satisfies IUpdateProfile,
    validators: {
      onChange: IUpdateProfileValidator,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update(value)
        .eq("id", user?.id!);

      setLoading(false);

      if (error) {
        setServerError(error.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: GetActiveUserQueryOptions(user?.id!).queryKey,
      });

      router.replace("/(tabs)/profile");
    },
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      const publicUrl = await uploadAvatar(user?.id!, imageUri);
      form.setFieldValue("avatar_url", publicUrl);
    }
  };

  return (
    <ScreenLayout backButton>
      <View className="flex-1 justify-between">
        <View className="mt-12 flex items-center">
          <form.Subscribe selector={(state) => state.values.avatar_url}>
            {(avatar_url) => (
              <Avatar
                src={{ uri: avatar_url || "" }}
                fallback={user?.full_name || user?.username || ""}
                size="large"
                uploadNew
                onUploadPress={pickImage}
              />
            )}
          </form.Subscribe>

          <form.Field name="full_name">
            {(field) => (
              <Input
                placeholderAsLabel
                placeholder="Full Name"
                value={field.state.value ?? ""}
                onBlur={() => {
                  field.handleBlur();
                  setServerError(null);
                }}
                onChangeText={(text) => field.setValue(text)}
                error={field.state.meta.errors[0]?.message}
                showError={
                  field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0
                }
                isBlurred={field.state.meta.isBlurred}
              />
            )}
          </form.Field>

          <form.Field name="bio">
            {(field) => (
              <Input
                placeholderAsLabel
                placeholder="Bio"
                value={field.state.value ?? ""}
                onBlur={() => {
                  field.handleBlur();
                  setServerError(null);
                }}
                onChangeText={(text) => field.setValue(text)}
                error={field.state.meta.errors[0]?.message}
                showError={
                  field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0
                }
                isBlurred={field.state.meta.isBlurred}
              />
            )}
          </form.Field>
        </View>

        <View className="gap-y-4">
          <Typography className="font-nunito-sans text-attention-5 text-center">
            {serverError}
          </Typography>

          <Button
            title="Update Profile"
            onPress={form.handleSubmit}
            loading={loading}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
