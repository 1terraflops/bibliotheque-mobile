import { AddBookMutationOptions } from "@/api/books/add-book.mutation";
import { getReviewsForBookQueryOptions } from "@/api/books/get-reviews-for-book.query";
import { ReviewItem } from "@/components/search";
import { Button, ScreenLayout, Typography } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets";
import { Book as BookType } from "@/types/books";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Bookmark } from "lucide-react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type BookParams = {
  title: string;
  author: string;
  coverUrl: string;
  isbn: string;
  pageCount: string;
  description: string;
};

export default function Book() {
  const params = useLocalSearchParams<BookParams>();
  const book: BookType = {
    ...params,
    pageCount: Number(params.pageCount),
  };

  const { data: reviews } = useQuery(getReviewsForBookQueryOptions(book.isbn));

  const { mutateAsync, isPending, isError, isSuccess } = useMutation(
    AddBookMutationOptions(),
  );

  if (isSuccess) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  if (isError) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  return (
    <ScreenLayout backButton scrollable>
      <View className="items-center py-4">
        <BookCard book={book} />
      </View>

      <View className="px-5 pt-5 gap-1">
        <Typography
          className="text-2xl font-bold leading-tight"
          numberOfLines={3}
        >
          {book.title}
        </Typography>

        <Typography className="text-base text-neutral-500 dark:text-neutral-400">
          {book.author}
        </Typography>
      </View>

      <View className="flex-row gap-4 px-5 mt-4">
        {book.pageCount > 0 && (
          <View className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-2 items-center">
            <Typography className="text-xs text-neutral-500 uppercase tracking-widest">
              Pages
            </Typography>

            <Typography className="text-lg font-semibold mt-0.5">
              {book.pageCount}
            </Typography>
          </View>
        )}

        <Button
          className="flex-1"
          iconLeft={Bookmark}
          onPress={() => mutateAsync({ isbn: book.isbn })}
          loading={isPending}
        >
          Save
        </Button>
      </View>

      {book.description && (
        <View className="px-5 mt-6 gap-2">
          <Typography className="text-xs text-neutral-500 uppercase tracking-widest">
            About
          </Typography>

          <Typography className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {book.description}
          </Typography>
        </View>
      )}

      {reviews && reviews.length > 0 && (
        <View className="my-4 gap-2">
          <Typography className="px-5 text-3xl font-inter-600">
            Reviews
          </Typography>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-5 gap-3"
          >
            {reviews.map((r) => (
              <ReviewItem key={r.createdAt + r.author} {...r} />
            ))}
          </ScrollView>
        </View>
      )}
    </ScreenLayout>
  );
}
