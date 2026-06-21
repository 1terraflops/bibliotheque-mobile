import { getBooksByStatusesQueryOptions } from "@/api/books/get-books-by-statuses.query";
import { BookContextMenu, LoadingLibrary } from "@/components/library";
import { Button, ScreenLayout, Typography } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets";
import { formatStatus } from "@/utils/formatStatus";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { ChevronRight, Plus, PlusCircle } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function Index() {
  const {
    data: booksByStatuses,
    isLoading,
    refetch,
  } = useQuery(getBooksByStatusesQueryOptions());

  if (isLoading) {
    return <LoadingLibrary />;
  }

  const booksLength = booksByStatuses?.flatMap((b) => b.books).length;

  if (!booksLength) {
    return (
      <ScreenLayout
        isRefreshing={isLoading}
        refresh={refetch}
        title="Library"
        rightButton={
          <Button
            variant="icon"
            iconLeft={Plus}
            iconSize={28}
            onPress={() => router.push("/add-book")}
          />
        }
      >
        <View className="flex-1 items-center justify-center">
          <Typography className="text-xl font-inter-600">
            Your library is empty
          </Typography>

          <Typography className="text-xl text-center font-inter-400">
            Add your first book to start tracking your progress and stats
          </Typography>

          <Button
            variant="icon"
            iconLeft={PlusCircle}
            iconSize={98}
            className="mt-6"
            onPress={() => router.push("/add-book")}
          />
        </View>
      </ScreenLayout>
    );
  }

  const filteredBooks = booksByStatuses?.filter((book) => book.books.length);

  return (
    <ScreenLayout
      scrollable
      bottomPadding
      isRefreshing={isLoading}
      refresh={refetch}
      title="Library"
      rightButton={
        <Button
          variant="icon"
          iconLeft={Plus}
          iconSize={28}
          onPress={() => router.push("/add-book")}
        />
      }
    >
      {filteredBooks?.map((status) => (
        <View key={status.status} className="gap-4 mt-6">
          <Link
            href={{
              pathname: "/books/[status]",
              params: { status: status.status },
            }}
          >
            <View className="flex-row gap-2 items-center">
              <Typography className="text-2xl font-inter-700">
                {formatStatus(status.status)}
              </Typography>

              <Button variant="icon" iconLeft={ChevronRight} iconSize={20} />
            </View>
          </Link>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-6"
          >
            {status.books.map((item) => (
              <Link
                key={item.book.isbn}
                href={{
                  pathname: "/books/reading/[isbn]",
                  params: { isbn: item.book.isbn },
                }}
              >
                <BookContextMenu book={item}>
                  <BookCard book={item.book} cover={item.cover} />
                </BookContextMenu>
              </Link>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScreenLayout>
  );
}
