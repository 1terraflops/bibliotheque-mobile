import { getBookQueryOptions } from "@/api/books/get-book.query";
import { Button, Input, Spinner, Typography } from "@/components/shared";
import { BookISBN } from "@/components/shared/assets";
import { BookCard } from "@/components/shared/widgets";
import { IGetBook, IGetBookFormSchema } from "@/types/books/forms";
import * as Haptics from "expo-haptics";

import { AddBookMutationOptions } from "@/api/books/add-book.mutation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Camera, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";

export default function AddBook() {
  const { height } = useWindowDimensions();
  const [submittedISBN, setSubmittedISBN] = useState<string | null>(null);

  const { isbn } = useLocalSearchParams<{ isbn: string }>();

  const { mutate: addBook, isPending } = useMutation(AddBookMutationOptions());

  const form = useForm({
    defaultValues: { isbn: "" } satisfies IGetBook,
    validators: { onSubmit: IGetBookFormSchema },
    onSubmit: ({ value }) => {
      setSubmittedISBN(value.isbn);
    },
  });

  useEffect(() => {
    if (isbn) {
      form.setFieldValue("isbn", isbn);
      form.handleSubmit();
    }
  }, []);

  const {
    data: book,
    error,
    isLoading,
  } = useQuery({
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

  if (error) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  if (book) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    return (
      <Link href={{ pathname: "/(search)/book", params: book }}>
        <View
          style={{
            height: height * 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="p-8"
        >
          <View className="justify-center mt-auto">
            <BookCard book={book} />
          </View>

          <View className="justify-end mt-auto">
            <Button
              title="Add to Library"
              iconLeft={Plus}
              loading={isPending}
              onPress={() => {
                addBook({ isbn: submittedISBN! });
              }}
            />
          </View>
        </View>
      </Link>
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
            button={
              <Button
                variant="icon"
                iconLeft={Camera}
                onPress={() => router.navigate("/(modals)/scan-isbn")}
                className="mr-2"
              />
            }
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
            "ISBN is a 10 or 13-digit code located near your book’s barcode. It serves as a unique identifier for each book edition. Enter the ISBN or scan bar code with your camera to quickly add your book."
          }
        </Typography>

        <BookISBN />
      </View>
    </View>
  );
}
