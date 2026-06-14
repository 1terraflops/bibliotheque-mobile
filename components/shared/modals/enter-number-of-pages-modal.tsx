import { updateBookMutationOptions } from "@/api/books/update-book.mutation";
import { startSessionMutationOptions } from "@/api/reading-sessions/start-session.mutation";
import {
  IEnterNumberOfPagesForm,
  IEnterNumberOfPagesFormSchema,
} from "@/types/reading-sessions/forms";
import { cn } from "@/utils/cn";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { BookOpenText } from "lucide-react-native";
import { FC } from "react";
import { useColorScheme, View } from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Input } from "../input";
import { Typography } from "../typography";

type EnterNumberOfPagesModalProps = ModalProps<"EnterNumberOfPages">;

export const EnterNumberOfPagesModal: FC<EnterNumberOfPagesModalProps> = ({
  modal,
}) => {
  const { params, closeModal } = modal;
  const isLightTheme = useColorScheme() === "light";

  const {
    mutateAsync: updateBook,
    isPending: isBookUpdating,
    isError: isErrorUpdatingBook,
  } = useMutation(updateBookMutationOptions());

  const { mutate: startSession, isPending: isSessionStarting } = useMutation(
    startSessionMutationOptions(),
  );

  const form = useForm({
    defaultValues: {
      actualPageCount: 0,
    } satisfies IEnterNumberOfPagesForm,
    validators: {
      onChange: IEnterNumberOfPagesFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!params) return;
      const { book } = params.book;

      await updateBook({
        isbn: book.isbn,
        actualPageCount: value.actualPageCount,
      });

      if (!isErrorUpdatingBook) {
        startSession({
          isbn: params.book.book.isbn,
          bookId: book.id,
          startPage: 1,
        });
      }

      closeModal();
    },
  });

  return (
    <View
      className={cn(
        "border w-[340px] rounded-[20px] p-6 pt-5",
        isLightTheme ? "bg-light-1 border-light-3" : "bg-dark-1 border-dark-3",
      )}
    >
      <Typography className="text-2xl font-inter-600 tracking-tight mb-4">
        How long is this book?
      </Typography>

      <form.Field name="actualPageCount">
        {(field) => (
          <Input
            placeholderAsLabel
            placeholder="Number of pages"
            keyboardType="number-pad"
            icon={BookOpenText}
            value={field.state.value === 0 ? "" : String(field.state.value)}
            onBlur={field.handleBlur}
            onChangeText={(text) =>
              field.setValue(text === "" ? 0 : Number(text))
            }
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

      <Button
        loading={isBookUpdating || isSessionStarting}
        title="Submit"
        className="gap-4"
        onPress={form.handleSubmit}
      />
    </View>
  );
};
