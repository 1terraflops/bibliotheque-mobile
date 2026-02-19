import { getBookQueryOptions } from "@/api/books/get-book.query";
import { Input, Spinner, Typography } from "@/components/shared";
import { BookISBN } from "@/components/shared/assets";
import { IAddBook, IAddBookFormValidatorSchema } from "@/types/books";

import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";

export default function AddBook() {
  const { height } = useWindowDimensions();
  const [submittedISBN, setSubmittedISBN] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { isbn: "" } satisfies IAddBook,
    validators: { onSubmit: IAddBookFormValidatorSchema },
    onSubmit: ({ value }) => {
      setSubmittedISBN(value.isbn);
    },
  });

  const { data, error, isLoading } = useQuery({
    ...getBookQueryOptions({ isbn: submittedISBN ?? "" }),
    enabled: !!submittedISBN,
  });

  if (isLoading) {
    return (
      <View
        style={{
          height: height * 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </View>
    );
  }

  if (data) {
    return (
      <View
        style={{
          height: height * 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Title: {data.title}</Typography>
        <Typography>Author: {data.author}</Typography>
      </View>
    );
  }

  return (
    <View className="items-center px-8 py-2">
      <form.Field name="isbn">
        {(field) => (
          <Input
            placeholder="ISBN"
            keyboardType="numeric"
            returnKeyType="search"
            onSubmitEditing={(e) => {
              if (e.nativeEvent.text.trim()) {
                form.handleSubmit();
              }
            }}
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
          />
        )}
      </form.Field>

      <View className="items-center mt-4 gap-y-6">
        <Typography className="text-center text-lg leading-6">
          {
            "ISBN is a 10 or 13-digit code located near your book’s barcode. It serves as a unique identifier for each book edition. Enter the ISBN into the text field to quickly add your book."
          }
        </Typography>

        <BookISBN />
      </View>
    </View>
  );
}
