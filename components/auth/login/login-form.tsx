import { supabase } from "@/api/supabase";
import { Input } from "@/components/shared";
import { LoginRequestSchema } from "@/types/auth";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: LoginRequestSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return;
      }

      router.replace("/(tabs)");
    },
  });

  return (
    <View>
      <form.Field name="email">
        {(field) => (
          <Input
            placeholderAsLabel
            icon={Mail}
            placeholder="Email"
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
      <form.Field name="password">
        {(field) => (
          <>
            <Input
              placeholderAsLabel
              secure
              placeholder="Password"
              icon={Lock}
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
          </>
        )}
      </form.Field>
      <Pressable onPress={form.handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};
