import { Button, Input } from "@/components/shared";
import { useForm } from "@tanstack/react-form";
import { Mail, Send } from "lucide-react-native";
import { View } from "react-native";
import { ILandingForm, ILandingFormSchema } from "./model/model";

export const LandingForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies ILandingForm,
    validators: {
      onChange: ILandingFormSchema,
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
            // error={field.state.meta.errors[0]?.message}
            // showError={
            //   field.state.meta.isDirty &&
            //   field.state.meta.isBlurred &&
            //   field.state.meta.errors.length > 0
            // }
            // isBlurred={field.state.meta.isBlurred}
          />
        )}
      </form.Field>

      <Button title="Send Link" iconLeft={Send} />
    </View>
  );
};
