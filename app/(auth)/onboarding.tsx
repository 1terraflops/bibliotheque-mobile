import { updateProfileMutationOptions } from "@/api/users/update-profile.mutation";
import { uploadAvatarMutationOptions } from "@/api/users/upload-avatar.mutation";
import {
  Avatar,
  Button,
  Input,
  ScreenLayout,
  Typography,
} from "@/components/shared";
import { useSessionStore } from "@/store/session.store";
import { IUpdateProfile, IUpdateProfileValidator } from "@/types/user";
import pickImage from "@/utils/pickImage";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { View } from "react-native";

export default function Onboarding() {
  const user = useSessionStore().user;

  const { mutateAsync: uploadAvatar, error: avatarError } = useMutation(
    uploadAvatarMutationOptions(),
  );

  const { mutate: updateProfile, error: profileError } = useMutation(
    updateProfileMutationOptions(),
  );

  const form = useForm({
    defaultValues: {
      avatar_url: user?.avatar_url,
      full_name: user?.full_name,
      bio: user?.bio,
      username: user?.username,
    } satisfies IUpdateProfile,
    validators: {
      onChange: IUpdateProfileValidator,
    },
    onSubmit: async ({ value }) => {
      if (!user?.id) return;

      let avatarUrl = value.avatar_url;

      if (avatarUrl && avatarUrl.startsWith("file")) {
        avatarUrl = await uploadAvatar({
          id: user.id,
          imageUri: avatarUrl,
        });
      }

      updateProfile({
        id: user.id,
        data: {
          ...value,
          avatar_url: avatarUrl,
        },
      });
    },
  });

  const handleAvatarUpload = async () => {
    const imageUri = await pickImage();
    if (!imageUri) return;

    form.setFieldValue("avatar_url", imageUri);
  };

  return (
    <ScreenLayout>
      <View className="flex-1 justify-between">
        <View className="mt-12 flex items-center">
          <form.Subscribe selector={(state) => state.values.avatar_url}>
            {(avatar_url) => (
              <Avatar
                src={{ uri: avatar_url || "" }}
                fallback={user?.full_name || user?.username || ""}
                size="large"
                uploadNew
                onUploadPress={handleAvatarUpload}
              />
            )}
          </form.Subscribe>

          <View className="my-6 w-full">
            <form.Field name="username">
              {(field) => (
                <Input
                  placeholderAsLabel
                  placeholder="Username"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChangeText={(text) => field.setValue(text)}
                  error={
                    field.state.meta.errors[0]?.message || profileError?.message
                  }
                  showError={
                    profileError != null ||
                    (field.state.meta.isDirty &&
                      field.state.meta.isBlurred &&
                      field.state.meta.errors.length > 0)
                  }
                  isBlurred={field.state.meta.isBlurred}
                />
              )}
            </form.Field>
          </View>

          <form.Field name="full_name">
            {(field) => (
              <Input
                label="Optional"
                placeholder="Full Name"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChangeText={(text) => field.setValue(text)}
                error={field.state.meta.errors[0]?.message}
                showError={
                  field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0
                }
              />
            )}
          </form.Field>

          <form.Field name="bio">
            {(field) => (
              <Input
                multiline
                label="Optional"
                placeholder="Bio"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChangeText={(text) => field.setValue(text)}
                error={field.state.meta.errors[0]?.message}
                showError={
                  field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0
                }
              />
            )}
          </form.Field>
        </View>

        <View className="gap-y-4">
          <Typography className="font-nunito-sans text-attention-5 text-center">
            {avatarError?.message}
          </Typography>

          <Button
            title="Continue"
            onPress={form.handleSubmit}
            loading={form.state.isSubmitting}
            disabled={form.state.isSubmitting}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
