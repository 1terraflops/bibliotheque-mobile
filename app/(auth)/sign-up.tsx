import { signUpMutationOptions } from "@/api/auth/sign-up.mutation";
import { Button, Input, ScreenLayout, Typography } from "@/components/shared";
import { ISignUp, ISignUpFormSchema } from "@/types/auth";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react-native";
import { View } from "react-native";

export default function SignUp() {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation(signUpMutationOptions());

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies ISignUp,
    validators: {
      onChange: ISignUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      await signUp(value);
    },
  });

  return (
    <ScreenLayout backButton>
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
            <Input
              secure
              label="Optional"
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
          )}
        </form.Field>
      </View>

      <View className="justify-end mt-auto gap-y-4">
        <Typography
          hideSkeleton
          className="font-nunito-sans text-attention-5 text-center"
        >
          {error?.message}
        </Typography>

        <Button
          loading={isPending}
          title="Sign Up"
          onPress={form.handleSubmit}
        />
      </View>
    </ScreenLayout>
  );
}
