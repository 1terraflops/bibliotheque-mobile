import { supabase } from "@/api/supabase";
import { Button, Input } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { Mail, Send } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { ILandingForm, ILandingFormSchema } from "./model/model";

export const LandingForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies ILandingForm,
    validators: {
      onChange: ILandingFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { email } = value;
      setLoading(true);

      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      setLoading(false);

      if (error) {
        return;
      }

      router.push({
        pathname: "/(auth)/confirm-email",
        params: {
          email,
        },
      });
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

      <Button
        loading={loading}
        title="Send Link"
        iconLeft={Send}
        onPress={form.handleSubmit}
      />
    </View>
  );
};
