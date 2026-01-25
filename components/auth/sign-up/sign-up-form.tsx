import { supabase } from "@/api/supabase";
import { Button, Input, Typography } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { ISignUpForm, ISignUpFormSchema } from "./model/model";

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies ISignUpForm,
    validators: {
      onChange: ISignUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;
      setLoading(true);

      const options = {
        emailRedirectTo: "exp://192.168.31.218:8081/--/confirm-email",
      };

      const { error } = password.length
        ? await supabase.auth.signUp({ email, password, options })
        : await supabase.auth.signInWithOtp({ email, options });

      setLoading(false);
      if (error) {
        setServerError(error.message);
        return;
      }

      router.push({
        pathname: "/(auth)/confirm-email",
        params: { email, type: "sign-up" },
      });
    },
  });

  return (
    <View className="w-full flex-1">
      <View className="w-full justify-center mt-auto">
        <Typography className="font-nunito-sans-800 text-4xl text-center mb-6">
          Create an account
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

        <form.Field name="password">
          {(field) => (
            <Input
              secure
              label="Optional"
              placeholder="Password"
              icon={Lock}
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

        <Button loading={loading} title="Sign Up" onPress={form.handleSubmit} />
      </View>
    </View>
  );
};
