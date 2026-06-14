import { addReviewMutationOptions } from "@/api/reviews/add-review.mutation";
import { IAddReviewForm, IAddReviewFormSchema } from "@/types/reviews/forms";
import { cn } from "@/utils/cn";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import {
  Keyboard,
  Pressable,
  Switch,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Input } from "../input";
import { Typography } from "../typography";

type AddReviewModalProps = ModalProps<"AddReview">;

export const AddReviewModal: FC<AddReviewModalProps> = ({ modal }) => {
  const { params, closeModal } = modal;
  const isLightTheme = useColorScheme() === "light";

  const { mutateAsync: addReview, isPending } = useMutation(
    addReviewMutationOptions(),
  );

  const form = useForm({
    defaultValues: {
      review: "",
      hasSpoilers: false,
    } as IAddReviewForm,
    validators: {
      onChange: IAddReviewFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!params) return;
      const { id } = params;
      await addReview({
        id,
        review: value.review,
        hasSpoilers: value.hasSpoilers,
      });
      closeModal();
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={cn(
          "border w-[340px] rounded-[20px] p-6 pt-5",
          isLightTheme
            ? "bg-light-1 border-light-3"
            : "bg-dark-1 border-dark-3",
        )}
      >
        <Typography className="text-2xl font-inter-600 tracking-tight mb-2">
          Review
        </Typography>

        <form.Field name="review">
          {(field) => (
            <Input
              placeholderAsLabel
              placeholder="Your review"
              multiline
              numberOfLines={5}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChangeText={field.handleChange}
              error={field.state.meta.errors[0] as string | undefined}
              showError={
                field.state.meta.isDirty &&
                field.state.meta.isBlurred &&
                field.state.meta.errors.length > 0
              }
              isBlurred={field.state.meta.isBlurred}
            />
          )}
        </form.Field>

        <form.Field name="hasSpoilers">
          {(field) => (
            <Pressable
              onPress={() => field.setValue(!field.state.value)}
              className={cn(
                "flex-row items-center justify-between rounded-xl px-4 py-3",
                isLightTheme ? "bg-light-2" : "bg-dark-2",
              )}
            >
              <Typography className="text-base font-inter-400">
                Contains spoilers
              </Typography>
              <Switch
                value={field.state.value}
                onValueChange={(val) => field.setValue(val)}
              />
            </Pressable>
          )}
        </form.Field>

        <Button
          loading={isPending}
          title="Submit"
          className="gap-4 mt-4"
          onPress={form.handleSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
