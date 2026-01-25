import { supabase } from "@/api/supabase";
import { Button, Input, Typography } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { IForgotPasswordForm, IForgotPasswordFormSchema } from "../model/model";

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies IForgotPasswordForm,
    validators: {
      onChange: IForgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { email } = value;
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "exp://192.168.31.218:8081/--/reset-password",
      });

      setLoading(false);
      if (error) {
        setServerError(error.message);
        return;
      }

      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          email,
          type: "password-reset",
        },
      });
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
              onBlur={() => {
                field.handleBlur();
                setServerError(null);
              }}
              onChangeText={(text) => field.setValue(text)}
              error={field.state.meta.errors[0]?.message}
              showError={
                !!serverError ||
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
          {serverError}
        </Typography>

        <Button
          loading={loading}
          title="Reset Password"
          onPress={form.handleSubmit}
        />
      </View>
    </View>
  );
};
