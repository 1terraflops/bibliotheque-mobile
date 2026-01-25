import { supabase } from "@/api/supabase";
import { Button, Input, Typography } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { ILoginForm, ILoginFormSchema } from "./model/model";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies ILoginForm,
    validators: {
      onChange: ILoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);

      if (error) {
        setServerError(error.message);
        return;
      }

      router.replace("/(tabs)");
    },
  });

  return (
    <View className="flex-1 w-full items-center">
      <View className="w-full items-center mt-auto">
        <Typography className="text-center font-nunito-sans-800 text-4xl mb-6">
          Welcome Back!
        </Typography>

        <form.Field name="email">
          {(field) => (
            <Input
              placeholderAsLabel
              icon={Mail}
              placeholder="Email"
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
            <>
              <Input
                placeholderAsLabel
                secure
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
            </>
          )}
        </form.Field>
      </View>

      <Button
        variant="text"
        title="I forgot my Password"
        onPress={() => router.navigate("/(auth)/forgot-password")}
      />

      <View className="mt-auto gap-y-4">
        <Text className="font-nunito-sans text-attention-5 text-center">
          {serverError}
        </Text>

        <Button
          onPress={form.handleSubmit}
          title="Login"
          variant="primary"
          loading={loading}
        />
      </View>
    </View>
  );
};
