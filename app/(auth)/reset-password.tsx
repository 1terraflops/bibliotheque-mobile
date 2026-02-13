import { resetPasswordMutationOptions } from "@/api/auth/reset-password.mutation";
import { Button, Input, ScreenLayout, Typography } from "@/components/shared";
import { IResetPassword, IResetPasswordFormSchema } from "@/types/auth";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "lucide-react-native";
import { View } from "react-native";

export default function ResetPassword() {
  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation(resetPasswordMutationOptions());

  const form = useForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    } satisfies IResetPassword,
    validators: {
      onChange: IResetPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await resetPassword(value);
    },
  });

  return (
    <ScreenLayout>
      <View className="w-full justify-center mt-auto">
        <Typography className="font-nunito-sans-800 text-4xl text-center mb-6">
          Reset Password
        </Typography>

        <form.Field name="new_password">
          {(field) => (
            <Input
              placeholderAsLabel
              placeholder="Email"
              icon={Mail}
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChangeText={(text) => field.setValue(text)}
              error={field.state.meta.errors[0]?.message}
              showError={
                !!error ||
                (field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0)
              }
              isBlurred={field.state.meta.isBlurred}
            />
          )}
        </form.Field>

        <form.Field name="confirm_password">
          {(field) => (
            <Input
              placeholderAsLabel
              placeholder="Email"
              icon={Mail}
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChangeText={(text) => field.setValue(text)}
              error={field.state.meta.errors[0]?.message}
              showError={
                !!error ||
                (field.state.meta.isDirty &&
                  field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0)
              }
              isBlurred={field.state.meta.isBlurred}
            />
          )}
        </form.Field>
      </View>

      <View className="justify-end mt-auto gap-y-4">
        <Typography className="font-nunito-sans text-attention-5 text-center">
          {error?.message}
        </Typography>

        <Button
          loading={isPending}
          title="Reset Password"
          onPress={form.handleSubmit}
        />
      </View>
    </ScreenLayout>
  );
}
