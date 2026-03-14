import { getBooksByStatusesQueryOptions } from "@/api/books/get-books-by-statuses.query";
import { LoadingLibrary } from "@/components/library";
import { Button, ScreenLayout, Typography } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets";
import { formatStatus } from "@/utils/formatStatus";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { ChevronRight, Plus } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { data: booksByStatuses, isLoading } = useQuery(
    getBooksByStatusesQueryOptions(),
  );

  if (isLoading) {
    return <LoadingLibrary />;
  }

  const filteredBooks = booksByStatuses?.filter((book) => book.books.length);

  return (
    <ScreenLayout
      scrollable
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
              <BookCard key={item.book.isbn} book={item.book} />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScreenLayout>
  );
}
