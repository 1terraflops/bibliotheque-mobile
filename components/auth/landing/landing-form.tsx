import { sendMagicLinkMutationOptions } from "@/api/auth/send-magic-link.mutation";
import { Button, Input } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, Send } from "lucide-react-native";
import { View } from "react-native";
import { ILandingForm, ILandingFormSchema } from "./model/model";

export const LandingForm = () => {
  const {
    mutateAsync: sendMagicLink,
    isPending,
    error,
  } = useMutation(sendMagicLinkMutationOptions());

  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies ILandingForm,
    validators: {
      onChange: ILandingFormSchema,
    },
    onSubmit: async ({ value }) => {
      await sendMagicLink(value);
    },
  });

  return (
    <View className="w-full">
      <form.Field name="email">
        {(field) => (
          <Input
            icon={Mail}
            placeholder="Email"
            value={field.state.value ?? ""}
            onBlur={field.handleBlur}
            onChangeText={(text) => field.setValue(text)}
            error={field.state.meta.errors[0]?.message || error?.message}
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

      <Button
        loading={isPending}
        title="Send Link"
        iconLeft={Send}
        onPress={form.handleSubmit}
        className="mt-2"
      />
    </View>
  );
};
