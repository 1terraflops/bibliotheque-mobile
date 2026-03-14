import { getBooksInfiniteQueryOptions } from "@/api/books/get-books.query";
import { ScreenLayout, Spinner } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets";
import { BookStatus, BookStatusAndFav } from "@/types/books";
import { formatStatus } from "@/utils/formatStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";

type BooksByStatusParams = {
  status: BookStatusAndFav;
};

export default function BooksByStatus() {
  const { status } = useLocalSearchParams<BooksByStatusParams>();

  function isBookStatus(value: string): value is BookStatus {
    return Object.values(BookStatus).includes(value as BookStatus);
  }

  const isFavorites = status === "FAVORITES";
  const bookStatus = isBookStatus(status) ? status : undefined;

  const {
    data: books,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    getBooksInfiniteQueryOptions({
      status: bookStatus,
      isFavorite: isFavorites || undefined,
    }),
  );

  if (isLoading) {
    return (
      <ScreenLayout backButton title={formatStatus(status)}>
        <View className="flex-row flex-wrap justify-center gap-x-16 mt-6">
          <BookCard loading />
          <BookCard loading />
        </View>
      </ScreenLayout>
    );
  }

  const normalizedData = books?.pages.flat();

  const fetchMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ScreenLayout backButton title={formatStatus(status)}>
      <View className="flex-1">
        <FlatList
          data={normalizedData}
          keyExtractor={(item) => item.book.isbn}
          numColumns={2}
          columnWrapperStyle={{ gap: 40, justifyContent: "center" }}
          contentContainerStyle={{ gap: 28, padding: 24 }}
          renderItem={({ item }) => (
            <View className="flex-1">
              <Link
                key={item.book.isbn}
                href={{
                  pathname: "/books/reading/[isbn]",
                  params: { isbn: item.book.isbn },
                }}
              >
                <BookCard book={item.book} />
              </Link>
            </View>
          )}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="items-center mt-4">
                <Spinner />
              </View>
            ) : null
          }
        />
      </View>
    </ScreenLayout>
  );
}
