import { useLoginMutation } from "@/api/auth/login.mutation";
import { LoginRequestSchema } from "@/types/auth";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export const LoginForm = () => {
  const router = useRouter();

  const { mutateAsync: login } = useLoginMutation();

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

      await login({
        email,
        password,
      });

      router.replace("/(tabs)");
    },
  });

  return (
    <View>
      <form.Field name="email">
        {(field) => (
          <TextInput
            placeholder="Email"
            value={field.state.value ?? ""}
            onBlur={field.handleBlur}
            onChangeText={(text) => field.setValue(text)}
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <>
            <TextInput
              placeholder="Password"
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChangeText={(text) => field.setValue(text)}
            />
            <Text>{field.state.meta.errors[0]?.message}</Text>
          </>
        )}
      </form.Field>
      <Pressable onPress={form.handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};
