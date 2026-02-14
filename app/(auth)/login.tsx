import { loginMutationOptions } from "@/api/auth/login.mutation";
import { Button, Input, ScreenLayout, Typography } from "@/components/shared";
import { ILogin, ILoginFormSchema } from "@/types/auth";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react-native";
import { View } from "react-native";

export default function Login() {
  const {
    mutate: login,
    error,
    isPending,
  } = useMutation(loginMutationOptions());

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies ILogin,
    validators: {
      onChange: ILoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await login(value);
    },
  });

  return (
    <ScreenLayout backButton>
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
                  !!error ||
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

      {/* <Button
        variant="text"
        title="I forgot my Password"
        onPress={() => router.navigate("/(auth)/forgot-password")}
      /> */}

      <View className="mt-auto gap-y-4">
        <Typography
          hideSkeleton
          className="font-nunito-sans text-attention-5 text-center"
        >
          {error?.message}
        </Typography>

        <Button
          onPress={form.handleSubmit}
          title="Login"
          variant="primary"
          loading={isPending}
        />
      </View>
    </ScreenLayout>
  );
}
