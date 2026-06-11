import { getReadingHistoryInfiniteQueryOptions } from "@/api/books/get-reading-history.query";
import { ReadingHistoryItem } from "@/components/activity";
import { ScreenLayout, Spinner, Typography } from "@/components/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function Activity() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(getReadingHistoryInfiniteQueryOptions({}));

  const history = data?.pages.flatMap((page) => page.history) ?? [];

  const mergedHistory = history.reduce<typeof history>((acc, group) => {
    const existing = acc.find((g) => g.date === group.date);
    if (existing) {
      existing.sessions.push(...group.sessions);
    } else {
      acc.push({ ...group, sessions: [...group.sessions] });
    }
    return acc;
  }, []);

  const formatDate = (date: string) => {
    const d = moment(date);

    if (d.isSame(moment(), "day")) return "Today";
    if (d.isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
    if (d.isSame(moment(), "year")) return d.format("MMMM D");

    return d.format("MMMM D, YYYY");
  };

  return (
    <ScreenLayout title="Activity">
      <FlatList
        data={mergedHistory}
        keyExtractor={(item) => item.date}
        contentContainerClassName="px-4 my-6"
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Typography className="font-semibold text-center text-neutral-400 uppercase tracking-wider mb-2">
              {formatDate(item.date)}
            </Typography>

            {item.sessions.map((session, index) => (
              <View key={session.id}>
                {index > 0 && (
                  <View className="w-0.5 rounded h-6 bg-light-5 ml-6" />
                )}

                <ReadingHistoryItem {...session} />
              </View>
            ))}
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator className="my-4" /> : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="flex-1 items-center justify-center">
              <Typography className="text-center">
                No reading history yet.
              </Typography>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Spinner />
            </View>
          )
        }
      />
    </ScreenLayout>
  );
}
