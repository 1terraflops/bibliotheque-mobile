import { deleteBookMutationOptions } from "@/api/books/delete-book.mutation";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useColorScheme, View } from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Typography } from "../typography";

type ConfirmDeleteBookModalProps = ModalProps<"ConfirmDeleteBook">;

export const ConfirmDeleteBookModal: FC<ConfirmDeleteBookModalProps> = ({
  modal,
}) => {
  const { params, closeModal } = modal;
  const isLightTheme = useColorScheme() === "light";

  const { mutate: deleteBook, isPending } = useMutation(
    deleteBookMutationOptions(),
  );

  return (
    <View
      className={cn(
        "border w-[340px] rounded-[20px] p-6 pt-5",
        isLightTheme ? "bg-light-1 border-light-3" : "bg-dark-1 border-dark-3",
      )}
    >
      <Typography className="text-2xl font-inter-600 tracking-tight mb-2">
        Delete this book?
      </Typography>
      <Typography
        className={cn(
          "leading-relaxed",
          isLightTheme ? "text-dark-4" : "text-light-4",
        )}
      >
        This book and its data will be permanently removed from your library.
      </Typography>

      <View className="flex-row gap-4 mt-6">
        <Button
          variant="secondary"
          title="No, Cancel"
          className="flex-1"
          onPress={() => closeModal("ConfirmDeleteBook")}
        />
        <Button
          destructive
          loading={isPending}
          title="Yes, Delete"
          className="flex-1"
          onPress={() => {
            if (!params) return;
            deleteBook(params.book);
            closeModal();
          }}
        />
      </View>
    </View>
  );
};
