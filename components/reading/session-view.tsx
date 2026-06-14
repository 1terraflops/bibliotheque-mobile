import { getSessionsInfiniteQueryOptions } from "@/api/reading-sessions/get-sessions.query";
import { Spinner, Typography } from "@/components/shared";
import { DateSeparator } from "@/components/shared/widgets";
import { SESSION_STATUS } from "@/types/reading-sessions";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import { FC } from "react";
import { FlatList, View } from "react-native";
import { SessionLog } from "./ui/session-log";

type SessionViewProps = {
  isbn: string;
};

export const SessionView: FC<SessionViewProps> = ({ isbn }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      getSessionsInfiniteQueryOptions({
        isbn,
        take: 10,
      }),
    );

  const fetchMoreSession = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  const sessions =
    data?.pages
      .flatMap((page) => page.data)
      .filter((session) => session.status === SESSION_STATUS.ENDED) ?? [];

  const highestPagesRead = Math.max(
    ...sessions.map((s) => s.pagesRead ?? 0),
    1,
  );
  const longestSession = Math.max(...sessions.map((s) => s.duration ?? 0), 1);
  const fastestSpeed = Math.max(...sessions.map((s) => s.readingSpeed ?? 0), 1);

  const renderedDates = new Set<string>();

  return (
    <View className="flex-1">
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Typography className="text-lg font-inter-500">
              Your sessions will appear here
            </Typography>
          </View>
        }
        renderItem={({ item }) => {
          const date = moment(item.startedAt).format("MMMM DD");
          const showSeparator = !renderedDates.has(date);
          if (showSeparator) renderedDates.add(date);

          return (
            <View className="gap-2 mt-2">
              {showSeparator && <DateSeparator date={item.startedAt} />}

              <SessionLog
                session={item}
                highestPagesRead={highestPagesRead}
                longestSession={longestSession}
                fastestSpeed={fastestSpeed}
              />
            </View>
          );
        }}
        onEndReached={fetchMoreSession}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage && hasNextPage ? (
            <View className="items-center mt-4">
              <Spinner />
            </View>
          ) : null
        }
      />
    </View>
  );
};
