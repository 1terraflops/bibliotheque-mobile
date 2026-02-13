import { ForgotPasswordMutationOptions } from "@/api/auth/forgot-password.mutation";
import { Button, Input, Typography } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "lucide-react-native";
import { View } from "react-native";
import { IForgotPasswordForm, IForgotPasswordFormSchema } from "../model/model";

export const ForgotPasswordForm = () => {
  const {
    mutateAsync: forgotPassword,
    isPending,
    error,
  } = useMutation(ForgotPasswordMutationOptions());

  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies IForgotPasswordForm,
    validators: {
      onChange: IForgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await forgotPassword(value);
    },
  });

  return (
    <View className="w-full flex-1">
      <View className="w-full justify-center mt-auto">
        <Typography className="font-nunito-sans-800 text-4xl text-center mb-6">
          Reset Password
        </Typography>

        <form.Field name="email">
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
    </View>
  );
};
