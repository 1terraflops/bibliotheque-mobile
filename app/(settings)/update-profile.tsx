import { queryClient } from "@/api/queryClient";
import { supabase } from "@/api/supabase";
import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import { Avatar, Button, Input, ScreenLayout } from "@/components/shared";
import { useSessionStore } from "@/store/session.store";
import { IUpdateProfile, IUpdateProfileValidator } from "@/types/user";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function UpdateProfile() {
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
      const { error } = await supabase
        .from("profiles")
        .update(value)
        .eq("id", user?.id!);

      if (error) {
        console.log("error: ", error);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: GetActiveUserQueryOptions(user?.id!).queryKey,
      });

      router.replace("/(tabs)/profile");
    },
  });

  return (
    <ScreenLayout backButton>
      <View className="flex-1 justify-between">
        <View className="mt-12 flex items-center">
          <Avatar
            src={{ uri: user?.avatar_url || "" }}
            fallback={user?.full_name || user?.username || ""}
            size="large"
            uploadNew
          />

          <form.Field name="full_name">
            {(field) => (
              <Input
                placeholderAsLabel
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
                onBlur={field.handleBlur}
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

        <View>
          <Button title="Update" onPress={form.handleSubmit} />
        </View>
      </View>
    </ScreenLayout>
  );
}
